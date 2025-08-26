import { Component, inject } from '@angular/core';
import { ContentWrapperComponent } from '../../components/content-wrapper/content-wrapper.component';
import { CenterDirective } from '../../derectives/center-content.directive';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import imageCompression, { Options } from 'browser-image-compression';
import {DropareaDirective} from '../../derectives/droparea.directive';

@Component({
  selector: 'app-home',
  imports: [
    ContentWrapperComponent,
    CenterDirective,
    NzButtonComponent,
    DecimalPipe,
    FormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    NzWaveDirective,
    ReactiveFormsModule,
    DropareaDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private imageCompress = imageCompression;
  private messageService = inject(NzMessageService);

  protected preview: string | null = null;
  protected compressed: string | null = null;
  protected compressedFile: any;
  protected originalSize: number | null = null;
  protected compressedSize: number | null = null;

  maxSize: number = 1;
  compressorQuality: number = 50;

  currentFile: File | null = null;
  availableForCompress = true;

  updateImageDisplay(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.currentFile = input.files[0];
      console.log(this.currentFile.size);

      this.preview = URL.createObjectURL(this.currentFile);
      this.originalSize = this.currentFile.size / 1024 / 1024;
    }
  }

  consolelogim(progress: number) {
    console.log(progress);
  }

  async compressFile() {
    console.log('compress file');
    if (this.currentFile && this.preview && this.availableForCompress) {
      this.availableForCompress = false;

      const options: Options = {
        initialQuality: this.compressorQuality / 100,
        alwaysKeepResolution: false,
        useWebWorker: true,
        onProgress: this.consolelogim,
        maxSizeMB: this.maxSize,
      };

      this.imageCompress(this.currentFile, options)
        .then((compressedImage: any) => {
          this.compressedFile = compressedImage;
          this.compressedSize = this.compressedFile.size / 1024 / 1024;
          this.imageCompress.getDataUrlFromFile(this.compressedFile).then((url) => {
            this.compressed = url;
            this.messageService.success('Successfully compressed');
          });
        })
        .finally(() => {
          this.availableForCompress = true;
        });
    }
  }

  download() {
    if (this.compressed) {
      const link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute('download', '');
      link.href = this.compressed;
      link.click();
    }
  }
}
