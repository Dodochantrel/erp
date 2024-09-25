import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  public show(message: string, type: NotificationType) {
    switch (type) {
      case 'success':
        this.toastr.success(message);
        break;
      case 'error':
        this.toastr.error(message);
        break;
      case 'info':
        this.toastr.info(message);
        break;
      case 'warning':
        this.toastr.warning(message);
        break;
    }
  }
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';
