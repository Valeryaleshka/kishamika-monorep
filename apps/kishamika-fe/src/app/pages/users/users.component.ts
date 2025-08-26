import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ContentWrapperComponent } from '../../components/content-wrapper/content-wrapper.component';
import { User } from './users.types';
import { UsersService } from './users.service';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users',
  imports: [ContentWrapperComponent],
  providers: [UsersService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);
  protected users = signal<User[]>([]);

  ngOnInit() {
    this.usersService
      .getUsers()
      .pipe(take(1))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.users.set(response);
      });
  }
}
