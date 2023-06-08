import { Component } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { SubCategory } from 'src/app/model/SubCategory';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['../../app.component.css'],
})
export class ShopComponent {
  products: Product[] = [];
  subcategories: SubCategory[] = [];
  p: number = 1;
  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
    this.productService.getAllSubCategories().subscribe((data) => {
      this.subcategories = data;
    });
  }
}
