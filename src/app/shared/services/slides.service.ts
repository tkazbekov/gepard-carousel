import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';

import { Slide } from '../types/Slide';

@Injectable({
  providedIn: 'root',
})
export class SlidesService {
  public slides: WritableSignal<Slide[]> = signal([]);

  constructor(private httpClient: HttpClient) {}

  getSlides() {
    this.httpClient.get('url').subscribe((data) => {
      this.slides.set(data as Slide[]);
    });
  }
}
