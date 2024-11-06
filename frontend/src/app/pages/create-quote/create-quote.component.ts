import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { User } from '../../class/user';
import { FileService } from '../../services/file.service';
import { CreateQuoteTableComponent } from '../../components/create-quote-table/create-quote-table.component';

@Component({
  selector: 'app-create-quote',
  standalone: true,
  imports: [CreateQuoteTableComponent],
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.css',
})
export class CreateQuoteComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly fileService: FileService
  ) {}

  public user: User = new User();
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.getInformations();
  }

  getInformations() {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        console.log(this.user);
      },
      error: () => {
        this.notificationService.show('Une erreur est survenue', 'error');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  decodeFile(file: string | null): string | null {
    if(file){
      return this.fileService.decodeFile(file);
    } else {
      return null;
    } 
  }
}
