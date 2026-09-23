package com.bite.api.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
  private final byte[] secret;
  private final long expirationMs;
  public JwtService(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration-ms}") long expirationMs) { this.secret = secret.getBytes(StandardCharsets.UTF_8); this.expirationMs = expirationMs; }
  public String createToken(User user) { Date now = new Date(); return Jwts.builder().claims(Map.of("name", user.getFullName(), "email", user.getEmail())).subject(user.getId().toString()).issuedAt(now).expiration(new Date(now.getTime() + expirationMs)).signWith(Keys.hmacShaKeyFor(secret)).compact(); }
}
