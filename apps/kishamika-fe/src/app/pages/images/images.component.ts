import { Component } from '@angular/core';
import { BarChartComponent } from '../../shared/common/d3-library/bar-chart/bar-chart.component';
import { ContentWrapperComponent } from '../../components/content-wrapper/content-wrapper.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.css',
  imports: [BarChartComponent, ContentWrapperComponent],
})
export class ImagesComponent {
  values = [815, 150, 250, 320, 400, 550, 325, 625, 22, 556];
}
