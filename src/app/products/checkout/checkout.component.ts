import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../shared/services/products.service';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  public productService = inject(ProductsService);
  private sub = new Subscription();
  subTotal = 0;
  shipping = 0;
  shippingForm!: FormGroup;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  // get phoneNumberValidationRegex() {
  //   return /^\d{10}$/;
  // }

  get emailValidationRegex() {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  ngOnInit() {
    this.sub = this.productService.getTotalCost().subscribe((cost) => {
      this.subTotal = cost;
    });
    this.initializeForm();
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }

  initializeForm() {
    this.shippingForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.pattern(this.emailValidationRegex)],
      ],
      phone: [
        '',
        [
          Validators.required,
          // Validators.pattern(this.phoneNumberValidationRegex),
        ],
      ],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      country: ["", [Validators.required]],
      state: ['', [Validators.required]],
    });
    const data = JSON.parse(localStorage.getItem('shipping') as string)
    data && this.shippingForm.patchValue(data)
  }

  // Getters for form controls
  get firstname() {
    return this.shippingForm.get('firstname') as FormControl;
  }

  get lastname() {
    return this.shippingForm.get('lastname') as FormControl;
  }

  get email() {
    return this.shippingForm.get('email') as FormControl;
  }

  get phone() {
    return this.shippingForm.get('phone') as FormControl;
  }

  get address() {
    return this.shippingForm.get('address') as FormControl;
  }

  get city() {
    return this.shippingForm.get('city') as FormControl;
  }

  get zipcode() {
    return this.shippingForm.get('zipcode') as FormControl;
  }

  get country() {
    return this.shippingForm.get('country') as FormControl;
  }

  get state() {
    return this.shippingForm.get('state') as FormControl;
  }

  onSave() {
    console.log(this.shippingForm.value);

    if (this.shippingForm.invalid) {
      console.log("Inavlid");
      console.log(this.shippingForm);
      this.shippingForm.controls;
      Object.keys(this.shippingForm.controls).forEach((field) => {
        const control = this.shippingForm.get(field);
        (control as FormControl).markAsTouched({ onlySelf: true });
      });
      return;
    }
    console.log("Valid");
    localStorage.setItem('shipping', JSON.stringify(this.shippingForm.value))
    this.router.navigate(['/order-summary']);
    //  [routerLink]="['/order-summary']" routerLinkActive="router-link-active"
  }
}
