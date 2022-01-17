import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.css'],
})
export class DeletemodalComponent implements OnInit {
  @Input() title!: string;
  @Input() bigTitle!: string;
  @Input() buttonText!: string;
  @Input() description!: string;
  @Output() event = new EventEmitter<string>();
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  yes() {
    this.modalRef?.hide();
    this.event.emit('delete');
  }
}
