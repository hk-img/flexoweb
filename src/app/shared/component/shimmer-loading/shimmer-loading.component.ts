import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shimmer-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shimmer-loading.component.html',
  styleUrls: ['./shimmer-loading.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShimmerLoadingComponent {


  @HostBinding('class') class = 'shimmer-loading';

  @Input() width = '80%';
  @Input() height = '12px';
  @Input() shape: 'circle' | 'square' | 'rect' = 'rect';
  @Input() borderRadius = '5px';
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  constructor() {}
  ngOnInit() {}
  get shimmerHeight(): string {
    switch (this.shape) {
      case 'circle':
        return this.width;
      case 'square':
        return this.width;
      case 'rect':
        return this.height;
      default:
        return this.height;
    }
  }

  get shimmerBorderRadius(): string {
    return this.shape === 'circle' ? '50%' : this.borderRadius;
  }
}