import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GoogleButtonComponent } from '../components/google-button/google-button';
import { LogoAmbient } from '../components/logo-ambient/logo-ambient';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatButtonModule, GoogleButtonComponent, LogoAmbient, CommonModule],
})
export class LoginComponent implements OnInit {
  typeForm: 'login' | 'register' = 'login';

  constructor() {}

  ngOnInit() {}

  onGoogleSignIn(ev: { credential: string }) {
    const idToken = ev.credential;
    console.log('ID Token do Google:', idToken);

    // EXEMPLO: enviar para o seu backend validar e trocar por sessão própria
    // this.http.post('/api/auth/google', { idToken }).subscribe(...)
    localStorage.setItem('kivo_user_token_google', idToken);
  }

  get isLoginMode(): boolean {
    return this.typeForm === 'login';
  }

  public switchAuthMode() {
    this.typeForm = this.typeForm === 'login' ? 'register' : 'login';
  }
}
