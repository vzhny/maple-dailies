import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { ContainerModule } from '../container/container.module';

/*
    All modal related files are courtesy of:
    https://jasonwatmore.com/post/2020/09/24/angular-10-custom-modal-window-dialog-box
*/

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, ContainerModule],
  exports: [ModalComponent],
  providers: [ModalService],
})
export class ModalModule {}
