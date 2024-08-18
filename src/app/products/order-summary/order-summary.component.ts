import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  CartItem,
  ProductsService,
} from '../../shared/services/products.service';
import { noop, Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CurrencyPipe, ButtonComponent, DatePipe, RouterLink],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  shippingForm: any;
  public productService = inject(ProductsService);
  private sub = new Subscription();
  private totalSub = new Subscription();
  cartItems!: CartItem[];
  subTotal = 0;
  shipping = 2500;
  paymentStatus: 'failed' | 'success' | 'pending' = 'pending';
  get reference() {
    const timeStamp = new Date().getTime();
    const result = Math.random().toString(36).substring(2, 15);
    return `WEB-${timeStamp}${result}`;
  }
  flwHandler: any;
  date = new Date()

  ngOnInit() {
    this.sub = this.productService.getCartItems().subscribe((cart) => {
      this.cartItems = cart;
    });

    this.totalSub = this.productService.getTotalCost().subscribe((cost) => {
      this.subTotal = cost;
    });
    this.shippingForm = JSON.parse(localStorage.getItem('shipping') as string);
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
    this.totalSub.unsubscribe;
  }
  paymentInit() {}
  paymentCancel() {}
  paymentDone(event: any) {
    console.log(event);
  }

  onPayWithPaystack() {
    const handler = (window as any).PaystackPop.setup({
      key: 'pk_test_192bdfc911f14e8bf0929c7fa622610994be225b',
      email: this.shippingForm.email,
      amount: ((this.subTotal * 1.075 ) + this.shipping) * 100,
      channels: ['card', 'bank', 'ussd', 'qr', 'eft', 'mobile_money', 'bank_transfer', 'apple_pay'],
      onSuccess: (transaction: any) => {
        this.productService.clearCart();
        this.paymentStatus = 'success'
      },
      onLoad: (response: any) => {
        this.paymentStatus = 'pending'
      },
      onCancel: () => {
        this.paymentStatus = 'failed'
        this.paymentStatus = 'pending'
      },
      onError: (error: any) => {
        this.paymentStatus = 'failed'
      },
    });
    handler.openIframe()
    // this.flwHandler = (window as any).FlutterwaveCheckout({
    //   public_key: 'FLWPUBK_TEST-997ca9dc3cb99fe73ee6bb3a1d0a8cd3-X',
    //   tx_ref: this.reference,
    //   // Reducing amount for test purpose
    //   amount: (this.subTotal * 1.075 ) + this.shipping,
    //   currency: 'NGN',
    //   payment_options: 'card, banktransfer, ussd',
    //   redirect_url: '',

    //   customer: {
    //     email: this.shippingForm.email,
    //     phone_number: this.shippingForm.phone,
    //     name: `${this.shippingForm.firstname} ${this.shippingForm.lastname}`,
    //   },
    //   configurations: {
    //     session_duration: 10, //setting session duration to 10mis //Session timeout in minutes (maxValue: 1440 minutes)
    //     max_retry_attempt: 0, //No retry allowed //Max retry (int)
    // },
    //   // customizations: this.raveOptions.customizations,
    //   callback: (PaymentCalldata: any) => {
    //     setTimeout(() => {
    //       // this.paymentSuccess(PaymentCalldata, reservationInfo);
    //     }, 0);
    //   },
    //   onclose: () => {noop},
    // });
  }

  onPayWithFlw() {
    this.flwHandler = (window as any).FlutterwaveCheckout({
      public_key: 'FLWPUBK_TEST-997ca9dc3cb99fe73ee6bb3a1d0a8cd3-X',
      tx_ref: this.reference,
      // Reducing amount for test purpose
      amount: (this.subTotal * 1.075 ) + this.shipping,
      currency: 'NGN',
      payment_options: 'card, banktransfer, ussd',
      redirect_url: '',

      customer: {
        email: this.shippingForm.email,
        phone_number: this.shippingForm.phone,
        name: `${this.shippingForm.firstname} ${this.shippingForm.lastname}`,
      },
      configurations: {
        session_duration: 10, //setting session duration to 10mis //Session timeout in minutes (maxValue: 1440 minutes)
        max_retry_attempt: 0, //No retry allowed //Max retry (int)
    },
      // customizations: this.raveOptions.customizations,
      callback: (PaymentCalldata: any) => {
        setTimeout(() => {
          // this.paymentSuccess(PaymentCalldata, reservationInfo);
        }, 0);
      },
      onclose: () => {noop},
    });
  }
}
