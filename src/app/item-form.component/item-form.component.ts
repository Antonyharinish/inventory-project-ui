import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../services/item-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-form.component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss',
})
export class ItemFormComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;
  id?: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {

    // ✅ FORM WITH VALIDATION
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      sku: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: [0,
    [
      Validators.required,
      Validators.min(0),
      Validators.max(99999),            // limit maximum price
      Validators.pattern(/^\d{1,5}(\.\d{1,2})?$/) // max 5 digits + 2 decimals
    ]
  ],

  stock_quantity: [
    0,
    [
      Validators.required,
      Validators.min(0),
      Validators.max(9999),              // limit stock to 4 digits
      Validators.pattern(/^\d{1,4}$/)     // only numbers, max 4 digits
    ]
  ],


      // price: [0, [Validators.required, Validators.min(1)]],
      weight_kg: [0, [Validators.min(0)]],
      manufacturer: ['', Validators.required],
      country_of_origin: ['', Validators.required],
      // stock_quantity: [0, [Validators.required, Validators.min(0)]],
      is_active: [true]
    });

    // Check if editing item
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== 'new') {
        this.isEdit = true;
        this.id = +id;
        this.loadItem(this.id);
      }
    });
  }

  loadItem(id: number) {
    this.loading = true;
    this.itemService.get(id).subscribe({
      next: (item) => {
        if (item) {
          this.form.patchValue(item);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload = this.form.value;

    if (this.isEdit && this.id) {
      this.itemService.update(this.id, payload).subscribe({
        next: () => { this.loading = false; this.router.navigate(['/']); },
        error: (err) => { console.error(err); this.loading = false; alert('Update failed'); }
      });
    } else {
      this.itemService.create(payload).subscribe({
        next: () => { this.loading = false; this.router.navigate(['/']); },
        error: (err) => { console.error(err); this.loading = false; alert('Create failed'); }
      });
    }
  }

  limitPrice(event: any) {
  let val = event.target.value;
  if (val.length > 8) {
    event.target.value = val.slice(0, 8);
    this.form.get('price')?.setValue(event.target.value);
  }
}

limitStock(event: any) {
  let val = event.target.value;
  if (val.length > 4) {
    event.target.value = val.slice(0, 4);
    this.form.get('stock_quantity')?.setValue(event.target.value);
  }
}


}
