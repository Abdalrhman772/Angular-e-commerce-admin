import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private shared: SharedService) {}

  private base_url = this.shared.base_url + 'carts';

  getAllCarts(param?: any) {
    let params = new HttpParams();
    params = params
      .append('startDate', param?.startDate)
      .append('endDate', param?.endDate);
    return this.http.get(this.base_url, { params });
  }

  deleteCart(id: number) {
    return this.http.delete(this.base_url + '/' + id);
  }
}
