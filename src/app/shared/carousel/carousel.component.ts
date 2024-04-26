import { Component, OnInit } from '@angular/core';

import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { SlidesService } from '../services/slides.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselItemComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {

  constructor(public slidesService: SlidesService) {}

  ngOnInit(): void {
    this.slidesService.getSlides()
  }
}
