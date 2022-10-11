import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor() {}
  getPoducts() {
    return this.productList.asObservable();
  }

  setProduct(products: any) {
    this.cartItemList.push(...products);
    this.productList.next(products);
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }
  addToCart(products: any) {
    this.cartItemList.push(products);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  removeCartItem(products: any) {
    this,
      this.cartItemList.map((a: any, index: any) => {
        if (products.id === a.id) {
          this.cartItemList.splice(index, 1);
        }
      });
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
