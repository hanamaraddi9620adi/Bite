import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: false,
  template: `<section class="container orders-page"><div class="page-heading"><p class="eyebrow">YOUR BITE HISTORY</p><h1>Orders worth remembering.</h1><p>Sign in to see your past deliveries and reorder favourites.</p></div><div class="empty-orders"><div class="empty-icon">⌁</div><h2>Your order history is waiting</h2><p>When you place an order, it will show up here. For now, let’s find something delicious.</p><a routerLink="/" class="btn btn-dark rounded-pill px-4">Explore the menu <span>→</span></a></div></section>`,
})
export class OrdersComponent {}
