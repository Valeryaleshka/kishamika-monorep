import { Component, computed, inject } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { HeaderMenuComponent } from '../../../components/header-menu/header-menu.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-login-widget',
  standalone: true,
  imports: [HeaderMenuComponent, NzButtonComponent],
  templateUrl: './login-widget.component.html',
  styleUrl: './login-widget.component.css',
})
export class LoginWidgetComponent {
  private userService = inject(UserService);
  protected currentUser = computed(this.userService.getUser);

  menuItems = [
    { title: 'Login', link: '/login' },
    { title: 'Register', link: '/register' },
  ];

  logout() {
    this.userService.logoutUser();
  }
}
