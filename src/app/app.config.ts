import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()), provideToastr(
    {
      timeOut: 10000, // Display each toast for 5 seconds
      preventDuplicates: true, // Prevent duplicate toasts from appearing
      // closeButton: true, // Show close button on each toast
      progressBar: true, // Show a progress bar indicating the remaining time
      progressAnimation: 'increasing', // Progress bar animation style
      extendedTimeOut: 2000, // Extend timeOut after user hovers over the toast
      easeTime: 300, // Duration of animation easing
      toastClass: 'ngx-toastr toast-class', // Custom class for additional styling
    }
  ),]
};
