import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SlidesService } from '../services/slides.service';

@Directive({
  selector: '[sliderObserver]',
  standalone: true,
})
export class SliderObserverDirective
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() index!: number;
  @Output() visible = new EventEmitter<number>();
  private observer: IntersectionObserver | undefined;

  constructor(
    private elementRef: ElementRef,
    private sliderService: SlidesService
  ) {}

  ngOnInit(): void {
    this.createObserver();
  }

  ngAfterViewInit(): void {
    this.startObserving();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
  }

  createObserver() {
    const options = {
      rootMargin: '0px',
      threshold: [0.2, 0.4, 0.6, 0.8, 1],
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (
            entry.boundingClientRect.x === 0 &&
            !(this.sliderService.previousX === 0)
          ) {
            this.visible.emit(this.index);
          }
          this.sliderService.previousX = entry.boundingClientRect.x;
        }
      });
    }, options);
  }

  startObserving() {
    if (!this.observer) {
      return;
    }
    this.observer.observe(this.elementRef.nativeElement);
  }
}
