import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { Slide } from '../types/Slide';

@Component({
  selector: 'app-carousel-item',
  standalone: true,
  imports: [],
  templateUrl: './carousel-item.component.html',
  styleUrl: './carousel-item.component.css',
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(50%)' })),
      transition('out => in', animate('300ms ease-in-out')),
    ]),
  ],
})
export class CarouselItemComponent implements AfterViewInit {
  @Input() slide!: Slide;
  visible = false;

  constructor(private elementRef: ElementRef) {}

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

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
          }
          this.visible = entry.intersectionRatio >= 0.5;
        });
      },
      { rootMargin: '0px', threshold: [0.3, 0.7] }
    );
    observer.observe(this.elementRef.nativeElement);
  }
}
