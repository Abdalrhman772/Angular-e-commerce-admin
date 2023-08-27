import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private productService: ProductsService
  ) {}
  carts: any[] = [];
  products: any[] = [];
  cartsForm!: FormGroup;
  total = 0;
  details: any;

  ngOnInit(): void {
    this.cartsForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
    });
    this.getAllCarts();
  }

  getAllCarts() {
    this.cartService.getAllCarts().subscribe((res: any) => {
      this.carts = res;
    });
  }
  applyFilter() {
    let date = this.cartsForm.value;
    this.cartService.getAllCarts(date).subscribe((res: any) => {
      this.carts = res;
    });
  }

  deleteCart(id: number) {
    this.cartService.deleteCart(id).subscribe((res) => {
      this.getAllCarts();
    });
  }

  viewCart(index: number) {
    console.log(this.products);
    this.products = []
    this.details = this.carts[index];
    for (let i in this.details.products) {
      this.productService
        .GetProductById(this.details.products[i].productId)
        .subscribe((res) => {
          this.products.push({ item: res, quantity: this.details.products[i].quantity });
        });
    }
  }
}
