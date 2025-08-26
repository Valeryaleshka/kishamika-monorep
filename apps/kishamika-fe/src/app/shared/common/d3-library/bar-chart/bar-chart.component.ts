import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BarChartComponent implements AfterViewInit, OnDestroy {
  private hostElement = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private svg: SVGSVGElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  values: InputSignal<number[]> = input([0]);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderChart();
      this.setupResizeObserver();
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.renderChart();
      });
      this.resizeObserver.observe(this.hostElement.nativeElement);
    }
  }

  private renderChart() {
    const element = this.hostElement.nativeElement;
    const containerWidth = element.clientWidth;
    const containerHeight = element.clientHeight;
    const yPad: number = 50; //need to adjust to text size
    const xPad: number = 50; //need to adjust to text size
    const yTicks: number = 4;
    const xValues = d3.range(0, this.values().length + 1);

    if (!this.svg) {
      this.svg = this.renderer.createElement('svg', 'http://www.w3.org/2000/svg');
      this.renderer.setAttribute(this.svg, 'width', '100%');
      this.renderer.setAttribute(this.svg, 'height', containerHeight.toString());
      this.renderer.setAttribute(this.svg, 'viewBox', `0 0 ${containerWidth} ${containerHeight}`);
      this.renderer.setAttribute(this.svg, 'preserveAspectRatio', 'xMinYMin meet');
      this.renderer.appendChild(element, this.svg);
    }

    while (this.svg?.firstChild) {
      this.renderer.removeChild(this.svg, this.svg.firstChild);
    }

    this.renderer.setAttribute(this.svg, 'viewBox', `0 0 ${containerWidth} ${containerHeight}`);

    this.drawChart(containerWidth, containerHeight, this.values(), xValues, yPad, xPad, yTicks);
  }

  private drawChart(
    width: number,
    height: number,
    yValues: number[],
    xValues: number[],
    yPad: number,
    xPad: number,
    yTicks: number,
  ) {
    const xScale = d3
      .scaleBand()
      .domain(xValues.slice(0, yValues.length).map(String))
      .range([xPad, width - xPad])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(yValues) ?? 0])
      .range([height - yPad, yPad]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(yTicks);

    const xAxisGroup = this.renderer.createElement('g', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(xAxisGroup, 'class', 'axis');
    this.renderer.setAttribute(xAxisGroup, 'transform', `translate(0,${height - yPad})`);

    const yAxisGroup = this.renderer.createElement('g', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(yAxisGroup, 'class', 'axis yaxis');
    this.renderer.setAttribute(yAxisGroup, 'transform', `translate(${xPad},0)`);

    this.renderer.appendChild(this.svg, xAxisGroup);
    this.renderer.appendChild(this.svg, yAxisGroup);

    d3.select(xAxisGroup).call(xAxis);
    d3.select(yAxisGroup).call(yAxis);

    d3.select(xAxisGroup).select('.domain').remove();

    const xAxisLine = this.renderer.createElement('path', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(xAxisLine, 'class', 'domain');
    this.renderer.setAttribute(xAxisLine, 'stroke', 'black');
    this.renderer.setAttribute(xAxisLine, 'd', `M${xPad},0H${width - xPad}`);
    this.renderer.appendChild(xAxisGroup, xAxisLine);

    d3.select(yAxisGroup).select('.domain').remove();
    d3.select(xAxisGroup).selectAll('.tick line').remove();
    d3.select(yAxisGroup).selectAll('.tick line').remove();

    const yAxisLine = this.renderer.createElement('path', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(yAxisLine, 'class', 'domain');
    this.renderer.setAttribute(yAxisLine, 'stroke', 'black');
    this.renderer.setAttribute(yAxisLine, 'd', `M0,${yPad}V${height - yPad}`);
    this.renderer.appendChild(yAxisGroup, yAxisLine);

    yValues.forEach((y, i) => {
      const rect = this.renderer.createElement('rect', 'http://www.w3.org/2000/svg');

      this.renderer.setAttribute(rect, 'x', (xScale(i.toString()) ?? 0).toString());
      this.renderer.setAttribute(rect, 'y', yScale(y + 2).toString());
      this.renderer.setAttribute(rect, 'width', xScale.bandwidth().toString());
      this.renderer.setAttribute(rect, 'height', (yScale(0) - yScale(y)).toString());
      this.renderer.setAttribute(rect, 'fill', '#90e0ef');
      this.renderer.setAttribute(rect, 'class', 'bar-chart-rect');

      const text = this.renderer.createElement('text', 'http://www.w3.org/2000/svg');
      this.renderer.setAttribute(
        text,
        'x',
        ((xScale(i.toString()) ?? 0) + xScale.bandwidth() / 2).toString(),
      );
      this.renderer.setAttribute(text, 'y', (yScale(y) - 5).toString()); // Position above bar
      this.renderer.setAttribute(text, 'text-anchor', 'middle');
      this.renderer.setAttribute(text, 'class', 'axis-text');
      this.renderer.setProperty(text, 'textContent', y.toString());

      this.renderer.listen(rect, 'mouseenter', () => {
        this.renderer.addClass(text, 'display-text');
      });

      this.renderer.listen(rect, 'mouseleave', () => {
        this.renderer.removeClass(text, 'display-text');
      });

      this.renderer.appendChild(this.svg, rect);
      this.renderer.appendChild(this.svg, text);
    });
  }
}
