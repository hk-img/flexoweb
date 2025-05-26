import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @Input() name: string = '';
  @Input() class: string = '';
  @Input() size: string = '6'; // default w-6 h-6
  @Input() color: string = 'gray-700';

  get iconClass(): string {
    return `w-${this.size} h-${this.size} text-${this.color} ${this.class}`;
  }
}
