import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../services/notification.service';
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
export class UploadFileComponent {
  constructor(private readonly fileService: FileService) {}

  @Input() reactiveForm: FormGroup = new FormGroup({});

  selectedFile: string | null = null;

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (loadEvent) => { // called once readAsDataURL is completed
        if(loadEvent.target) {
          this.selectedFile = loadEvent.target.result as string;
          const fileEncoded = this.fileService.encodeFile(event.target.files[0]);
          this.reactiveForm.setValue({ ...this.reactiveForm.value, logo: fileEncoded });
        }
      }
    }
  }
}
