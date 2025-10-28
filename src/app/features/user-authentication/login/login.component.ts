import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GoogleButtonComponent } from '../components/google-button/google-button';
import { LogoAmbient } from '../components/logo-ambient/logo-ambient';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { Feedback } from '../../../core/services/feedback';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    MatButtonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatDividerModule,
    GoogleButtonComponent,
    LogoAmbient,
    CommonModule,
  ],
})
export class LoginComponent implements OnInit {
  typeForm: 'login' | 'register' = 'login';

  private feedback = inject(Feedback);

  constructor() {}

  ngOnInit() {}

  onGoogleSignIn(ev: { credential: string }) {
    const idToken = ev.credential;
    console.log('ID Token do Google:', idToken);

    // EXEMPLO: enviar para o seu backend validar e trocar por sessão própria
    // this.http.post('/api/auth/google', { idToken }).subscribe(...)
    localStorage.setItem('kivo_user_token_google', idToken);
  }

  onLoginSuccess() {
    this.feedback.success('Login efetuado com sucesso!');
  }

  get isLoginMode(): boolean {
    return this.typeForm === 'login';
  }

  public switchAuthMode() {
    this.typeForm = this.typeForm === 'login' ? 'register' : 'login';
  }
}
