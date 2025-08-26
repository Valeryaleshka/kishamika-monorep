import { computed, DestroyRef, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../api/api.service';
import { User } from '../../pages/users/users.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  private currentUser: WritableSignal<User | null> = signal(null);
  public getUser = computed(() => this.currentUser());

  public loginUser(user: User) {
    this.currentUser.set(user);
  }

  public logoutUser() {
    this.api
      .post('auth/logout', {})
      .pipe(take(1))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(_ => {
        this.currentUser.set(null);
      });
  }
}
