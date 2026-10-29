import { Component, HostBinding,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
type AuthMode = 'login' | 'signup';
type Theme = 'dark' | 'light';


@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  mode = signal<AuthMode>('login');
  theme = signal<Theme>('dark');
 
  @HostBinding('attr.data-theme')
  get themeAttr() {
    return this.theme();
  }
 
  setTheme(theme: Theme) {
    this.theme.set(theme);
  }

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = signal(false);
  errorMessage = signal<string | null>(null);
 
  setMode(mode: AuthMode) {
    this.mode.set(mode);
    this.errorMessage.set(null);
  }
 
  get isLogin() {
    return this.mode() === 'login';
  }
 
  submit() {
    this.errorMessage.set(null);
 
    if (!this.email || !this.password) {
      this.errorMessage.set('Vyplň e-mail a heslo.');
      return;
    }
    if (!this.isLogin && this.password !== this.confirmPassword) {
      this.errorMessage.set('Heslá sa nezhodujú.');
      return;
    }
 
    this.loading.set(true);
 
    //TODO: Replace with your real auth call (HttpClient / AuthService)
    setTimeout(() => {
      this.loading.set(false);
      console.log(this.isLogin ? 'Login' : 'Signup', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
    }, 900);
  }
}
