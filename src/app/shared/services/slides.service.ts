import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, WritableSignal, signal } from '@angular/core';

import { Slide } from '../types/Slide';
import { BehaviorSubject, elementAt } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SlidesService {
  public slides: WritableSignal<Slide[]> = signal([]);
  public preventAnimations: WritableSignal<boolean> = signal(false);
  public slidesReady$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public animationEnabled = true;
  public previousX: number = 0;
  private timer: any;

  private wrapElement!: HTMLElement;

  constructor(private httpClient: HttpClient) {}

  getSlides() {
    this.httpClient.get<Slide[]>('url').subscribe((data: Slide[]) => {
      this.setSlides(data);
    });
  }

  private setSlides(slides: Slide[]) {
    this.slides.set(slides);
  }

  shiftLeft() {
    this.setScroll('left');
  }

  shiftRight() {
    this.setScroll('right');
  }

  private setScroll(direction: 'left' | 'right') {
    this.preventAnimations.set(true);
    if (this.wrapElement) {
      this.wrapElement.style.scrollBehavior = 'unset';
      this.wrapElement.scrollLeft =
        direction === 'left'
          ? this.wrapElement.clientWidth
          : this.wrapElement.scrollWidth - this.wrapElement.clientWidth * 2;
      this.wrapElement.style.scrollBehavior = 'smooth';
    }
  }

  setSlidesReady(status: boolean = true) {
    if (!this.slidesReady$.getValue()) {
      this.slidesReady$.next(status);
    }
  }

  initCarousel(wrap: ElementRef) {
    this.wrapElement = wrap.nativeElement as HTMLElement;
    const copySlideWithMockId = (slide: Slide) => ({
      ...slide,
      id: Math.random() * 1000,
    });
    this.slides.update((slides) => {
      return [
        copySlideWithMockId(slides[slides.length - 1]),
        ...slides,
        copySlideWithMockId(slides[0]),
      ];
    });
    this.startAutoScroll();
  }

  nextSlide() {
    this.wrapElement.scrollLeft += this.wrapElement.clientWidth;
  }

  startAutoScroll() {
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 2000); // 2 seconds should do fine
  }

  stopAutoScroll() {
    clearInterval(this.timer);
  }
}
