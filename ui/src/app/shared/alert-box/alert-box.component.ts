import { Component, Input } from '@angular/core';

export type AlertType = 'warning' | 'info' | 'danger' | 'default';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent {
  @Input() text: string;
  @Input() alertType: AlertType =  'default';

}
