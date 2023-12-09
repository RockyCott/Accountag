import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/auth/login']);
    }
    console.log('app.component.ts');
  }
}
