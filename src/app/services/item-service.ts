import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  
   // ✅ Static inventory data
  // private items: Item[] = [
  //   {
  //     id: 1,
  //     name: 'Rubber Duck',
  //     sku: 'DUCK-001',
  //     description: 'Small yellow rubber duck',
  //     price: 4.99,
  //     weight_kg: 0.05,
  //     manufacturer: 'ToyCo',
  //     country_of_origin: 'China',
  //     stock_quantity: 150,
  //     is_active: true,
  //     created_at: '2025-01-01T00:00:00Z',
  //     updated_at: '2025-01-01T00:00:00Z'
  //   },
  //   {
  //     id: 2,
  //     name: 'Wooden Train Set',
  //     sku: 'TRAIN-010',
  //     description: 'Classic wooden train set, 20 pieces',
  //     price: 49.99,
  //     weight_kg: 3.2,
  //     manufacturer: 'ClassicToys',
  //     country_of_origin: 'Poland',
  //     stock_quantity: 25,
  //     is_active: true,
  //     created_at: '2025-02-01T00:00:00Z',
  //     updated_at: '2025-02-01T00:00:00Z'
  //   },
  //   {
  //     id: 3,
  //     name: 'Toy Robot',
  //     sku: 'ROBOT-099',
  //     description: 'Battery-powered walking robot with LED eyes',
  //     price: 29.95,
  //     weight_kg: 1.2,
  //     manufacturer: 'RoboFun',
  //     country_of_origin: 'Japan',
  //     stock_quantity: 40,
  //     is_active: true,
  //     created_at: '2025-03-01T00:00:00Z',
  //     updated_at: '2025-03-01T00:00:00Z'
  //   }
  // ];

  // constructor() {}

  // /** ✅ Get all items */
  // list(): Observable<Item[]> {
  //   return of(this.items);
  // }

  // /** ✅ Get one item by ID */
  // get(id: number): Observable<Item | undefined> {
  //   const item = this.items.find(i => i.id === id);
  //   return of(item);
  // }

  // /** ✅ Add a new item */
  // create(item: Item): Observable<Item> {
  //   const newId = this.items.length > 0 ? Math.max(...this.items.map(i => i.id!)) + 1 : 1;
  //   const newItem = { ...item, id: newId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  //   this.items.push(newItem);
  //   return of(newItem);
  // }

  // /** ✅ Update existing item */
  // update(id: number, item: Item): Observable<Item | undefined> {
  //   const index = this.items.findIndex(i => i.id === id);
  //   if (index > -1) {
  //     const updatedItem = { ...this.items[index], ...item, updated_at: new Date().toISOString() };
  //     this.items[index] = updatedItem;
  //     return of(updatedItem);
  //   }
  //   return of(undefined);
  // }

  // /** ✅ Delete item by ID */
  // delete(id: number): Observable<boolean> {
  //   const index = this.items.findIndex(i => i.id === id);
  //   if (index > -1) {
  //     this.items.splice(index, 1);
  //     return of(true);
  //   }
  //   return of(false);
  // }

 private API_BASE = 'http://localhost:8000/api'; // backend URL

  constructor(private http: HttpClient) { }

  // list(params?: any): Observable<any> {
  //   let httpParams = new HttpParams();
  //   if (params) {
  //     Object.keys(params).forEach(k => httpParams = httpParams.set(k, params[k]));
  //   }
  //   return this.http.get(`${this.API_BASE}/items/`, { params: httpParams });
  // }

  list(page: number = 1, params: any = {}): Observable<any> {
  let httpParams = new HttpParams().set('page', page);

  // Keep support for additional query params
  Object.keys(params).forEach(key => {
    httpParams = httpParams.set(key, params[key]);
  });

  return this.http.get(`${this.API_BASE}/items/`, { params: httpParams });
}


  get(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.API_BASE}/items/${id}/`);
  }

  create(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.API_BASE}/items/`, item);
  }

  update(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.API_BASE}/items/${id}/`, item);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_BASE}/items/${id}/`);
  }
  

}
