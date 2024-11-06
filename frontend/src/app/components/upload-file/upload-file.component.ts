import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [],
  providers: [MessageService],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent implements OnInit {
  constructor(private readonly fileService: FileService) {}

  @Input() reactiveForm: FormGroup = new FormGroup({});
  public imageBase64: string = '';

  ngOnInit() {
    this.reactiveForm.valueChanges.subscribe((form) => {
      this.imageBase64 = form.logo;
    });
  }

  async onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageBase64 = await this.encodeImageBase64(file);
      this.reactiveForm.setValue({ ...this.reactiveForm.value, logo: this.imageBase64 });
    }
  }

  encodeImageBase64(image: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Content = base64String.split(',')[1];
        resolve(base64Content);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(image);
    });
  }

  decodeImageBase64(base64: string = ''): string {
    return `data:image/png;base64,${base64}`;
  }
}
