package com.bite.api.auth;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final UserRepository users;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthController(UserRepository users, PasswordEncoder passwordEncoder, JwtService jwtService) { this.users = users; this.passwordEncoder = passwordEncoder; this.jwtService = jwtService; }

  @PostMapping("/signup")
  public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
    String email = request.email().trim().toLowerCase();
    if (users.existsByEmailIgnoreCase(email)) return ResponseEntity.status(HttpStatus.CONFLICT).build();
    User user = users.save(new User(request.fullName().trim(), email, passwordEncoder.encode(request.password())));
    return ResponseEntity.status(HttpStatus.CREATED).body(responseFor(user));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
    return users.findByEmailIgnoreCase(request.email().trim()).filter(user -> passwordEncoder.matches(request.password(), user.getPasswordHash())).map(user -> ResponseEntity.ok(responseFor(user))).orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
  }

  private AuthResponse responseFor(User user) { return new AuthResponse(jwtService.createToken(user), user.getFullName(), user.getEmail()); }

  public record SignupRequest(@NotBlank String fullName, @NotBlank @Email String email, @NotBlank @Size(min = 6) String password) {}
  public record LoginRequest(@NotBlank @Email String email, @NotBlank String password) {}
  public record AuthResponse(String token, String fullName, String email) {}
}
