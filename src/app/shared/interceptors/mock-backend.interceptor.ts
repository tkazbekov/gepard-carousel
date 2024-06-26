import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';

import { delay, of } from 'rxjs';
import { Slide } from '../types/Slide';

const slides: Slide[] = [
  {
    id: 1,
    title: 'WinzUp Loyalty Program',
    caption:
      'Get up to 35% in rewards: daily rakeback, weekly cashback and level-up bonuses',
    highlight: '35% in rewards',
    image: 'assets/winzup.png',
    bgImage: 'assets/winzup-bg.webp',
    ctaCaption: 'Join now',
  },
  {
    id: 2,
    title: `Valentine's Fortune Drops`,
    caption: 'Trigger random prizes and win a share of €30,000!',
    highlight: '€30,000',
    image: 'assets/vfd.png',
    bgImage: 'assets/vfd-bg.png',
    ctaCaption: 'Learn more',
  },
  {
    id: 3,
    title: 'Wheel of Winz',
    caption: 'Spin the wheel to win up to €15,000 weekly',
    highlight: '€15,000',
    image: 'assets/wm.png',
    bgImage: 'assets/wm-bg.webp',
    ctaCaption: 'Spin now',
  },
];

/**
 * Mock backend interceptor function that intercepts any http request and returns a mock response
 * No need to edit since we only have 1 request to simulate
 *
 * @returns Observable<HttpResponse<Slide[]>> An observable of slides with a 1 second delay
 */
export const mockBackendInterceptor: HttpInterceptorFn = () => {
  return of(new HttpResponse({ status: 200, body: slides })).pipe(delay(2000));
};
