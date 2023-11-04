import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  ID = 0;
  product: any;
  cartProducts: any[] = [];
  loading: boolean = false;

  constructor(
    private myRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.ID = this.myRoute.snapshot.params['id'];
    this.loading = true;
    this.getProductDetails();
  }

  getProductDetails() {
    this.productsService.productsSource.subscribe((product: any) => {
      if (product) {
        this.product = product;
        this.loading = false;
      } else {
        this.productsService.GetProductById(this.ID).subscribe({
          next: (data: any) => {
            this.product = data;
            this.loading = false;
          },
        });
      }
    });
  }
}
