import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @Input() name: string = '';
  @Input() class: string = '';

  get iconClass(): string {
    return `${this.class}`;
  }
}
