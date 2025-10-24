import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LiquidSimulation } from '../../../../utils/LiquidSimulation';

@Component({
  selector: 'app-logo-ambient',
  imports: [],
  templateUrl: './logo-ambient.html',
  styleUrl: './logo-ambient.scss',
})
export class LogoAmbient implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    if (this.canvas?.nativeElement) {
      new LiquidSimulation(this.canvas.nativeElement);
    } else {
      console.error('Canvas não encontrado!');
    }
  }
}
