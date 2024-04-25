import { Component, OnInit } from '@angular/core';

import { Slide, slides } from '../carousel-item/carousel-item';
import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { ObserveDirective } from '../directives/observe.directive';
import { Subject, delay } from 'rxjs';

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
  private slidesSubject = new Subject<Slide[]>();

  ngOnInit(): void {
    this.slidesSubject.pipe(delay(2000)).subscribe((slides) => {
      this.slides = slides;
    })
    this.getSlides();
  }

  getSlides() {
    this.slidesSubject.next(slides);
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
    console.log(id);
    if (id === this.slides[0].id) {
      this.queuedAction = 'left';
    } else if (id === this.slides[this.slides.length - 1].id) {
      this.queuedAction = 'right';
    }
  }
}
