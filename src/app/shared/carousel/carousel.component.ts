import { Component } from '@angular/core';
import { CarouselItemComponent } from '../carousel-item/carousel-item.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselItemComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {}
