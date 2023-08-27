import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private shared: SharedService) {}
  private base_url = this.shared.base_url + 'products';
  productsSource = new BehaviorSubject<any>(null);

  GetAllProducts() {
    return this.http.get(this.base_url);
  }

  GetAllCategories() {
    return this.http.get(this.base_url + '/categories');
  }

  GetProductsByCategory(category: string) {
    return this.http.get(this.base_url + '/category/' + category);
  }

  GetProductById(id: any) {
    return this.http.get(this.base_url + '/' + id);
  }

  createProduct(newProduct:any){
    return this.http.post(this.base_url, newProduct)
  }
}
