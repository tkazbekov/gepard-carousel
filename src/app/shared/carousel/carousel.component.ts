import { Component, OnInit } from '@angular/core';

import { Slide } from '../carousel-item/carousel-item';
import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { ObserveDirective } from '../directives/observe.directive';
import { SlidesService } from '../services/slides.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselItemComponent, ObserveDirective],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  public slides: Slide[] | undefined;
  private queuedAction: 'left' | 'right' | undefined;

  constructor(private slidesService: SlidesService) {}

  ngOnInit(): void {
    this.getSlides();
  }

  getSlides() {
    this.slidesService.getSlides().subscribe((slides) => {
      this.slides = slides;
    })
  }

  onScrollEnd() {
    if (this.queuedAction) {
      this.addSlide(this.queuedAction);
      this.queuedAction = undefined;
    }
  }

  addSlide(direction: 'left' | 'right') {
    if (!this.slides) {
      return;
    }
    if (direction === 'left') {
      this.slides.unshift(this.slides[this.slides.length - 1]);
      this.slides.pop();
    } else if (direction === 'right') {
      this.slides.push(this.slides[0]);
      this.slides.shift();
    }
  }

  onVisible(id: number) {
    if (!this.slides) {
      return;
    }
    if (id === this.slides[0].id) {
      this.queuedAction = 'left';
    } else if (id === this.slides[this.slides.length - 1].id) {
      this.queuedAction = 'right';
    }
  }
}
