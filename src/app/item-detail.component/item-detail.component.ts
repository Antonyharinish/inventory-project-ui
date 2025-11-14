import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-item-detail.component',
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss',
})
export class ItemDetailComponent implements OnInit {

  item: any;
  loading = false;

  constructor(private itemService: ItemService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.load(id);
  }

  load(id: number) {
    this.loading = true;
    this.itemService.get(id).subscribe({
      next: (res) => { this.item = res; this.loading = false; },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  edit() {
    this.router.navigate([`/items/${this.item.id}/edit`]);
  }
}
