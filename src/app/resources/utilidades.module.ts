import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';




@NgModule({
  declarations: [AlertComponent],
  imports: [
    // ModalModule,
    CommonModule,
    FormsModule,
  ],
  exports:[AlertComponent],
})
export class UtilidadesModule { }
