import { Component } from '@angular/core';

import type { Slide } from '../carousel-item/carousel-item';
import { CarouselItemComponent } from '../carousel-item/carousel-item.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselItemComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  slides: Slide[] = [
    {
      id: 1,
      title: 'WinzUp Loyalty Program',
      caption:
        'Get up to 35% in rewards: daily rakeback, weekly cashback and level-up bonuses',
      highlight: '35% in rewards',
      image: 'assets/winzup.png',
      bgImage: 'assets/winzup-bg.webp',
    },
    {
      id: 2,
      title: `Valentine's Fortune Drops`,
      caption: 'Trigger random prizes and win a share of €30,000!',
      highlight: '€30,000',
      image: 'assets/vfd.png',
      bgImage: 'assets/vfd-bg.png',
    },
    {
      id: 3,
      title: 'Wheel of Winz',
      caption: 'Spin the wheel to win up to €15,000 weekly',
      highlight: '€15,000',
      image: 'assets/wm.png',
      bgImage: 'assets/wm-bg.webp',
    },
  ];

  addSlide(direction: 'left' | 'right') {
    if (direction === 'left') {
      this.slides.unshift(this.slides[this.slides.length - 1]);
      this.slides.pop();
    } else if (direction === 'right') {
      this.slides.push(this.slides[0]);
      this.slides.shift();
    }
  }
}
