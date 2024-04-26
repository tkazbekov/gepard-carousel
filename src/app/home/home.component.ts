import { Component } from '@angular/core';
import { CarouselComponent } from '../shared/carousel/carousel.component';
import { NavPanelComponent } from '../shared/nav-panel/nav-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, NavPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
