import { Component } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../app.component.css'],
})
export class HomeComponent {
  products: Product[] = [];
  p: number = 1;
  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
}
