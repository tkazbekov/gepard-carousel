import { ElementRef } from '@angular/core';
import { SliderObserverDirective } from './slider-observer.directive';
import { SlidesService } from '../services/slides.service';
export class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}

const mockSlidesService = jasmine.createSpyObj('SlidesService', []);

describe('SliderObserverDirective', () => {
  it('should create an instance', () => {
    const directive = new SliderObserverDirective(
      new MockElementRef(),
      mockSlidesService
    );
    expect(directive).toBeTruthy();
  });
});
