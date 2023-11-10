import { Component } from '@angular/core';
import Swal  from'sweetalert2';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  constructor(){

  }

  presentAlert(message){
    Swal.fire('Successful', message, 'success')

  }
  presentErrorAlert(message){
    Swal.fire('Successful', message, 'error')

  }
}
