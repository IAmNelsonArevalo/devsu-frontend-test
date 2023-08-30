import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent {
  @Input() value: string = "";
  @Input() disabled: boolean = false;
  @Input() placeholder: string = "";
  @Input() onChange: (e: any) => void = () => {};
}
