import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { SlidesService } from '../services/slides.service';
import { SliderObserverDirective } from '../directives/slider-observer.directive';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselItemComponent, SliderObserverDirective, LoaderComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  private touchStartX: number = 0;

  @ViewChild('wrap', { static: true }) wrap!: ElementRef;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const touchEndX = event.touches[0].clientX;
    const delta = touchEndX - this.touchStartX;
    if (delta > 10) {
      this.slidesService.stopAutoScroll();
    }
  }

  constructor(public slidesService: SlidesService) {
    this.slidesService.getSlides();
  }

  ngOnInit() {
    this.slidesService.slidesReady$.subscribe((status) => {
      if (status) {
        this.slidesService.initCarousel(this.wrap);
      }
    });
  }

  onVisible(index: number) {
    if (index === 0) {
      this.slidesService.shiftRight();
    }
    if (index === this.slidesService.slides().length - 1) {
      this.slidesService.shiftLeft();
    }
  }
}
