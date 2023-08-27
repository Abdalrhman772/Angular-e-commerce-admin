import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  constructor(
    private myRoute: ActivatedRoute,
    private productsService: ProductsService,
    private formBuilder: FormBuilder
  ) {}

  allProducts: any;
  products: any;
  categories: any;
  loading: boolean = false;
  ID = 0;
  imgSrc: any = '';
  imgUploaded = false;
  addProductForm!: FormGroup;

  ngOnInit(): void {
    this.getAllProducts();
    this.getCategories();
    this.addProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  getSelectedCategory(event: any) {
    this.addProductForm.get('category')?.setValue(event.target.value);
  }

  getAllProducts() {
    this.loading = true;
    this.productsService.GetAllProducts().subscribe({
      next: (data: any) => {
        this.allProducts = data;
        this.products = data;
        this.loading = false;
        console.log(this.allProducts);
      },
      error: (err: any) => {
        this.loading = false;
        alert(err);
        console.log(err);
      },
    });
  }

  getProductsCategory(category: string) {
    let res = this.allProducts.filter(
      (item: any) => item.category === category
    );
    this.products = res;
    console.log(res);
  }

  getCategories() {
    this.productsService.GetAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      error(err: any) {
        console.log(err);
      },
    });
  }

  getProductDetails(productId: number) {
    console.log(444);
    const selectedProduct = this.allProducts.filter(
      (item: any) => item.id == productId
    )[0];
    console.log('selectedProduct', selectedProduct);
    this.productsService.productsSource.next(selectedProduct);
  }

  getImgPath(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imgUrl = reader.result;
      if (imgUrl) {
        this.imgSrc = imgUrl;
        this.addProductForm.get('image')?.setValue(imgUrl);
        this.imgUploaded = true;
      } else {
        this.imgUploaded = false;
      }
    };
  }

  addProduct() {
    const newProduct = this.addProductForm.value;
    this.productsService.createProduct(newProduct).subscribe(res =>{
      alert("product added successfully")
    })
    console.log(this.addProductForm);
  }
}
