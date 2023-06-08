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
import { Status } from 'src/app/model/Status';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../app.component.css'],
})
export class ProductComponent {
  products: Product[] = [];
  statuses: Status[] = [];
  p: number = 1;
  subcategories: SubCategory[] = [];
  brands: Brand[] = [];
  productForm: FormGroup;
  selectedProducts: Product[] = [];
  constructor(
    public productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      id: null,
      productName: ['', [Validators.required]],
      color: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      sellPrice: ['', [Validators.required]],
      originPrice: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
      subcate: ['', [Validators.required]],
      brands: [[]],
    });
  }
  ngOnInit() {
    this.productService.getAllBrands().subscribe((data) => {
      this.brands = data;
    });
    this.productService.getAllStatuses().subscribe((data) => {
      this.statuses = data;
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
        alert('Success');
      },
      (error) => {
        console.error('Error adding employee:', error);
        alert('please try again!, or maybe ask me for fixing this bug');
      }
    );
  }

  deleteProduct(id: number) {
    if (confirm('Xác nhận xoá nhân viên này ?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter((p) => p.id !== id);
      });
    }
  }

  getDetail(id: number) {
    this.productService.getProductById(id).subscribe((p) => {
      //fill data getted emp to form
      console.log(p);
      this.productForm.setValue(p);
    });
  }
  updateProduct(id: number) {
    this.productForm;
    this.productService
      .updateProduct(id, this.productForm.value)
      .subscribe((response) => {
        this.productService.getAllProducts().subscribe((data) => {
          this.products = data;
        });
        this.productForm.reset();
      });
  }

  toggleProductSelection(p: Product) {
    if (this.isProductSelected(p)) {
      this.selectedProducts = this.selectedProducts.filter((e) => e !== p);
    } else {
      this.selectedProducts.push(p);
    }
  }

  isProductSelected(p: Product): boolean {
    return this.selectedProducts.includes(p);
  }
  multiDeleteProduct() {
    if (this.selectedProducts.length < 1) {
      alert('list selected employee is empty');
      return;
    }
    if (confirm('Xác nhận xoá các sản phẩm này ?')) {
      for (const p of this.selectedProducts) {
        this.productService.deleteProduct(p.id).subscribe(() => {
          this.products = this.products.filter((e) => e.id !== p.id);
        });
      }
    }
  }
}
