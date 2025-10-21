import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../../core/auth/google-auth';


@Component({
  selector: 'app-google-button',
  standalone: true,
  template: `<div #btn style="width:100%"></div>`,
})
export class GoogleButtonComponent implements OnInit {
  @ViewChild('btn', { static: true }) btn!: ElementRef<HTMLDivElement>;
  @Output() signedIn = new EventEmitter<{ credential: string }>();

  constructor(private googleAuth: GoogleAuthService) {}

  ngOnInit() {
    this.googleAuth.renderButton(this.btn.nativeElement, (resp) => {
      // resp.credential = ID token JWT
      this.signedIn.emit(resp);
    });
  }
}
