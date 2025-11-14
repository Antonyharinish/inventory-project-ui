import { Routes } from '@angular/router';
import { ItemListComponent } from './item-list.component/item-list.component';
import { ItemFormComponent } from './item-form.component/item-form.component';
import { ItemDetailComponent } from './item-detail.component/item-detail.component';

export const routes: Routes = [
 { path: '', component: ItemListComponent },
  { path: 'items/new', component: ItemFormComponent },
  { path: 'items/:id/edit', component: ItemFormComponent },
  { path: 'items/:id', component: ItemDetailComponent },
//   { path: '**', redirectTo: '' }
];
