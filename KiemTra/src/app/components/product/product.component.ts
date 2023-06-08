import { Component } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from '../../product.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SubCategory } from 'src/app/model/SubCategory';
import { Brand } from 'src/app/model/Brand';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  products: Product[] = [];
  p: number = 1;
  subcategories: SubCategory[] = [];
  brands: Brand[] = [];
  productForm: FormGroup;

  constructor(
    public productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      color: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      sellPrice: ['', [Validators.required]],
      originPrice: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [{ id: 1, statusName: 'Còn Hàng' }],
      subcate: ['', [Validators.required]],
      brands: [[]],
    });
  }
  ngOnInit() {
    this.productService.getAllBrands().subscribe((data) => {
      this.brands = data;
    });
    this.productService.getAllSubCategories().subscribe((data) => {
      this.subcategories = data;
    });

    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }

  onSubmit() {
    console.log(this.productForm.value);
    this.productService.createProduct(this.productForm.value).subscribe(
      (response) => {
        this.products.push(response);
        this.productForm.reset(); //reset the form
      },
      (error) => {
        console.error('Error adding employee:', error);
        alert('ID đã tồn tại');
      }
    );
  }
}
