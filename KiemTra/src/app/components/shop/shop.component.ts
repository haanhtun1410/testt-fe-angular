import { Component } from '@angular/core';
import { Brand } from 'src/app/model/Brand';
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
  brands: Brand[] = [];
   filteredProducts :Product[]= [];
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
    this.productService.getAllBrands().subscribe((data) => {
      console.log(data);
      this.brands = data;
    });
  }

  getByCategory(cate : SubCategory){
    this.productService.getProductBySubcateId(cate.id).subscribe((data) => {
         this.products = data;
    });
  }
  getByBrands(listIDP : number[]){
    this.products = [];
     for(var id of listIDP){
       this.productService.
       getProductById(id).subscribe((data) => this.products.push(data));
     }
    }
}
