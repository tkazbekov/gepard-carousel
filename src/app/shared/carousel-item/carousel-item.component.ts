import { Component, Input } from '@angular/core';

import type { Slide } from './carousel-item';

@Component({
  selector: 'app-carousel-item',
  standalone: true,
  imports: [],
  templateUrl: './carousel-item.component.html',
  styleUrl: './carousel-item.component.css',
})
export class CarouselItemComponent {
  @Input() slide!: Slide;

  getSlideCaption() {
    if (this.slide.highlight) {
      const regex = new RegExp(`(${this.slide.highlight})`, 'gi');
      return this.slide.caption.replace(
        regex,
        `<span class="highlight">$1</span>`
      );
    }
    return this.slide.caption;
  }
}
