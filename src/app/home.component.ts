import { Component } from '@angular/core';

interface Dish {
  name: string;
  restaurant: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  badge?: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  template: `
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-copy"><p class="eyebrow">DELIVERED WITH CARE</p><h1>Good food,<br><em>good mood.</em></h1><p class="hero-text">Discover local favourites, hidden gems, and comfort food delivered to your door.</p><div class="search-bar"><span>⌕</span><input placeholder="Search for dishes or restaurants" [(ngModel)]="searchTerm"><button class="btn btn-dark rounded-pill" (click)="search()">Search</button></div><div class="quick-links"><span>Popular:</span><button *ngFor="let tag of tags" (click)="searchTerm = tag; search()">{{ tag }}</button></div></div>
        <div class="hero-art"><div class="art-card art-card-back">🥗<small>Fresh picks</small></div><div class="art-card art-card-front">🍔<small>Made for you</small></div><div class="rating-float">★ 4.9 <small>from hungry locals</small></div></div>
      </div>
    </section>
    <section class="container content-section" id="menu"><div class="section-heading"><div><p class="eyebrow">THE NEIGHBOURHOOD MENU</p><h2>What are you craving?</h2></div><span class="result-count">{{ filteredDishes.length }} delicious picks</span></div>
      <div class="category-row"><button *ngFor="let category of categories" [class.selected]="activeCategory === category" (click)="setCategory(category)">{{ category }}</button></div>
      <div class="row g-4"><div class="col-md-6 col-lg-4" *ngFor="let dish of pagedDishes"><article class="dish-card"><div class="dish-image" [style.background-image]="'url(' + dish.image + ')'"> <span class="dish-badge" *ngIf="dish.badge">{{ dish.badge }}</span><button class="heart" aria-label="Save dish">♡</button></div><div class="dish-info"><div class="d-flex justify-content-between gap-2"><h3>{{ dish.name }}</h3><span class="price">&#36;{{ dish.price }}</span></div><p>{{ dish.restaurant }} · {{ dish.category }}</p><div class="dish-meta"><span class="rating">★ {{ dish.rating }}</span><span>25–35 min</span><button class="add-button" (click)="addToCart(dish)">+ Add</button></div></div></article></div></div>
      <nav class="pagination-wrap" aria-label="Menu pages"><button class="page-arrow" [disabled]="page === 1" (click)="page = page - 1">‹</button><button *ngFor="let pageNumber of pageNumbers" [class.current]="page === pageNumber" (click)="page = pageNumber">{{ pageNumber }}</button><button class="page-arrow" [disabled]="page === totalPages" (click)="page = page + 1">›</button></nav>
    </section>
    <div class="toast-message" *ngIf="message">{{ message }}</div>
  `,
})
export class HomeComponent {
  readonly tags = ['Pizza', 'Sushi', 'Burgers', 'Healthy'];
  readonly categories = ['All', 'Popular', 'Pizza', 'Asian', 'Burgers', 'Healthy'];
  readonly dishes: Dish[] = [
    { name: 'Truffle mushroom pizza', restaurant: 'Casa Crust', category: 'Pizza', price: 18, rating: 4.9, badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80' },
    { name: 'Salmon poke bowl', restaurant: 'Koi Kitchen', category: 'Healthy', price: 16, rating: 4.8, badge: 'Fresh today', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80' },
    { name: 'The smash burger', restaurant: 'Stacked', category: 'Burgers', price: 14, rating: 4.7, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
    { name: 'Spicy ramen', restaurant: 'Miso Happy', category: 'Asian', price: 15, rating: 4.9, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80' },
    { name: 'Green goddess salad', restaurant: 'The Daily Bowl', category: 'Healthy', price: 13, rating: 4.6, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
    { name: 'Miso caramel bao', restaurant: 'Koi Kitchen', category: 'Asian', price: 11, rating: 4.8, image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80' },
  ];
  searchTerm = ''; activeCategory = 'All'; page = 1; readonly perPage = 3; message = '';
  get filteredDishes() { const term = this.searchTerm.toLowerCase(); return this.dishes.filter((dish) => (this.activeCategory === 'All' || dish.category === this.activeCategory || (this.activeCategory === 'Popular' && dish.rating > 4.8)) && (!term || `${dish.name} ${dish.restaurant} ${dish.category}`.toLowerCase().includes(term))); }
  get totalPages() { return Math.max(1, Math.ceil(this.filteredDishes.length / this.perPage)); }
  get pageNumbers() { return Array.from({ length: this.totalPages }, (_, index) => index + 1); }
  get pagedDishes() { return this.filteredDishes.slice((this.page - 1) * this.perPage, this.page * this.perPage); }
  setCategory(category: string) { this.activeCategory = category; this.page = 1; }
  search() { this.page = 1; document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }); }
  addToCart(dish: Dish) { this.message = `${dish.name} added to your order`; setTimeout(() => this.message = '', 2500); }
}
