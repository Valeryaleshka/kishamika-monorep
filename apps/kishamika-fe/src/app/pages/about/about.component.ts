import { Component } from '@angular/core';
import { CenterDirective } from '../../derectives/center-content.directive';
import { ContentWrapperComponent } from '../../components/content-wrapper/content-wrapper.component';

@Component({
  selector: 'app-about',
  imports: [CenterDirective, ContentWrapperComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
