import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  styles: `
      .modal-content {
    z-index: 101; /* Modal içeriği için daha yüksek bir z-index değeri ayarlayın */
  }

  .modal-backdrop {
    z-index: 100; /* Modal zemin perdesi için daha düşük bir z-index değeri ayarlayın */
  }
  `
})
export class ModalComponent {

  link: string = '';
  name: string = '';
  desc: string = '';
  constructor(public activeModal: NgbActiveModal) { }

  sendData() {
    const data = {
      socialMediaLink: this.link,
      socialMediaName: this.name,
      description: this.desc
    };
    this.activeModal.close(data);
  }
}
