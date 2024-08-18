import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  otherImageUrl: string[];
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum categoryEnums {
  'Boxer Briefs',
  'Boxers',
  'Briefs',
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productList: Partial<Product>[] = [
    {
      id: 1,
      name: 'Product',
      price: 25,
      imageUrl: '../../../assets/MEN-BOXER-BLACK.jpg',
      description: '',
      category: categoryEnums[0],
      otherImageUrl: [
        '../../../assets/MEN-BOXER-BLACK.jpg',
        '../../../assets/MEN-BOXER-BLACK.jpg',
        '../../../assets/MEN-BOXER-BLACK.jpg',
      ],
    },
    {
      id: 2,
      name: 'Product',
      price: 25,
      imageUrl: '../../../assets/MEN-BOXER-BLUE.jpg',
      description: '',
      category: categoryEnums[1],
      otherImageUrl: [
        '../../../assets/MEN-BOXER-BLUE.jpg',
        '../../../assets/MEN-BOXER-BLUE.jpg',
        '../../../assets/MEN-BOXER-BLUE.jpg',
      ],
    },
    {
      id: 3,
      name: 'Product',
      price: 25,
      imageUrl: '../../../assets/MEN-BOXER-WHITE.jpg',
      description: '',
      category: categoryEnums[2],
      otherImageUrl: [
        '../../../assets/MEN-BOXER-WHITE.jpg',
        '../../../assets/MEN-BOXER-WHITE.jpg',
        '../../../assets/MEN-BOXER-WHITE.jpg',
      ],
    },
    {
      id: 4,
      name: 'Product',
      price: 25,
      imageUrl: '../../../assets/MEN-BOXER-BLACK.jpg',
      description: '',
      category: categoryEnums[0],
      otherImageUrl: [
        '../../../assets/MEN-BOXER-BLACK.jpg',
        '../../../assets/MEN-BOXER-BLACK.jpg',
        '../../../assets/MEN-BOXER-BLACK.jpg',
      ],
    },
    {
      id: 5,
      name: 'Product',
      price: 25,
      imageUrl: '../../../assets/MEN-BOXER-BLUE.jpg',
      description: '',
      category: categoryEnums[1],
      otherImageUrl: [
        '../../../assets/MEN-BOXER-BLUE.jpg',
        '../../../assets/MEN-BOXER-BLUE.jpg',
        '../../../assets/MEN-BOXER-BLUE.jpg',
      ],
    },
    {
      id: 6,
      name: 'Product',
      price: 25,
      imageUrl: '../../../assets/MEN-BOXER-WHITE.jpg',
      description: '',
      category: categoryEnums[2],
      otherImageUrl: [
        '../../../assets/MEN-BOXER-WHITE.jpg',
        '../../../assets/MEN-BOXER-WHITE.jpg',
        '../../../assets/MEN-BOXER-WHITE.jpg',
      ],
    },
  ];
  private categorys: any[] = [
    {
      id: 1,
      imageUrl: '../../assets/MEN-BOXER-BLUE.jpg',
      name: categoryEnums[0],
      description: 'Comfortable and loose-fitting, perfect for everyday wear.',
    },
    {
      id: 2,
      imageUrl: '../../assets/MEN-BOXER-WHITE.jpg',
      name: categoryEnums[1],
      description: 'Classic, snug fit for support and comfort.',
    },
    {
      id: 3,
      imageUrl: '../../assets/MEN-BOXER-BLACK.jpg',
      name: categoryEnums[2],
      description: 'Combining the fit of briefs with the length of boxers.',
    },
  ];
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);
  private cartTotalSubject = new BehaviorSubject<number>(0);
  shippingForm!: FormGroup;

  getCategorys() {
    return this.categorys;
  }

  getSimilarProducts(similarProduct: any) {
    const products =
      this.productList.filter((product) => {
        return (
          product.category === similarProduct.category &&
          product.id !== similarProduct.id
        );
      }) || [];
    return products;
  }

  getProducts(payload: any = null) {
    if (payload && payload.filter == 'All') {
      return this.productList;
    }
    if (payload && payload.filter != 'All') {
      const Products = payload?.filter
        ? this.productList.filter((product) => {
            return product.category === payload.filter;
          })
        : this.productList;
      return Products;
    }
    return this.productList;
  }

  getProduct(id: any): Product {
    const product: any = this.productList.find((product) => {
      return product?.id == id;
    });
    return product;
  }

  getCartItems() {
    this.cart = JSON.parse(localStorage.getItem('cart') as string) || [];
    this.cartSubject.next(this.cart);
    return this.cartSubject.asObservable();
  }

  getTotalCost(): Observable<number> {
    this.cart = JSON.parse(localStorage.getItem('cart') as string) || [];
    this.cartTotalSubject.next(this.calcTotalCost());
    return this.cartTotalSubject.asObservable();
  }

  addToCart(item: CartItem) {
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // existingItem.quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
    this.cartSubject.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartTotalSubject.next(this.calcTotalCost());
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.cartSubject.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartTotalSubject.next(this.calcTotalCost());
  }

  editCart(productId: number, quantity: number) {
    const item = this.cart.find((cartItem) => cartItem.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.cartSubject.next(this.cart);
        this.cartTotalSubject.next(this.calcTotalCost());
      }
    }
  }

  private calcTotalCost(): number {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getTotalQuantity(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.cartSubject.next(this.cart);
    this.cartTotalSubject.next(this.calcTotalCost());
  }
}
