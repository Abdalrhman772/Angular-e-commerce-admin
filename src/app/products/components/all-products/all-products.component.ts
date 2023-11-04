import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  constructor(
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
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        alert(err);
      },
    });
  }

  getProductDetails(productId: number) {
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
        this.addProductForm.get('image')?.setValue(this.imgSrc);
        this.imgUploaded = true;
      } else {
        this.imgUploaded = false;
      }
    };
  }

  addProduct() {
    const newProduct = this.addProductForm.value;
    this.productsService.createProduct(newProduct).subscribe((res) => {
      alert('product added successfully');
    });
    console.log(this.addProductForm);
  }

  update(product: any) {
    this.addProductForm.patchValue({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    });
    this.imgSrc = product.image;
    this.imgUploaded = true;
  }
}
