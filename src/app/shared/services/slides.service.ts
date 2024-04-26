import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Slide } from '../carousel-item/carousel-item';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  constructor(private httpClient: HttpClient) { }

  getSlides() {
    return this.httpClient.get<Slide[]>('https://example.com/getSlides');
  }
}
