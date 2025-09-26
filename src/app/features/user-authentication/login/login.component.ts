import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   imports: [MatButtonModule],
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
