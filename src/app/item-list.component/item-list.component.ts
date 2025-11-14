import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item-service';
import { Router } from '@angular/router';
import { Item } from '../models/item.model';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-item-list.component',
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent implements OnInit {

   items: Item[] = [];
  loading = false;
  error = '';

   page = 1;
  count = 0;
  next: string | null = null;
  previous: string | null = null;

  constructor(private itemService: ItemService, public router: Router) { }

  ngOnInit(): void {
    // this.load();
    this.load(1);
  }

  previousPage() {
  if (!this.previous) {
    this.load(1);   
    return;
  }

  const url = new URL(this.previous);
  const prevPage = Number(url.searchParams.get('page'));

  if (!prevPage || prevPage < 1) {
    this.load(1);
    return;
  }

  this.load(prevPage);
}

nextPage() {
  if (this.next) {
    const url = new URL(this.next);
    const nextPage = Number(url.searchParams.get('page'));
    this.load(nextPage);
  }
}

load(page: number = 1): void {
  if (page < 1) page = 1;

  this.itemService.list(page).subscribe(res => {
    this.items = res.results;
    this.count = res.count;
    this.previous = res.previous;
    this.next = res.next;
    this.page = page;
  });
}




  add() {
    this.router.navigate(['/items/new']);
  }

  edit(item: Item) {
    this.router.navigate([`/items/${item.id}/edit`]);
  }

  view(item: Item) {
    this.router.navigate([`/items/${item.id}`]);
  }

  deleteItem(item: Item) {
    if (!confirm(`Delete ${item.name}?`)) return;
    this.itemService.delete(item.id!).subscribe({
      next: () => this.load(1),
      error: (err) => { console.error(err); alert('Delete failed'); }
    });
  }


}
