import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Observable } from 'rxjs';
import { User } from './users.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiService = inject(ApiService);

  public getUsers(): Observable<User[]> {
    return this.apiService.get('users');
  }
}
