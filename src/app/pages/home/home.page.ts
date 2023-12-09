import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/home/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/home/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/home/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  isLogged = true;
  isAdmin = false;

  constructor(
    private platform: Platform,
    private router: Router,
    private tokenService: TokenService,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.menuController.enable(true);
      if (this.tokenService.getAuthorities().indexOf('ADMIN') !== -1) {
       this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    } else {
      this.isLogged = true;
      //this.menuController.enable(false);
      // enviar a login
      //this.router.navigate(['/auth/login']);
    }
  }

  initializeApp() {
    // this.platform.ready().then(() => {
    //   console.log('Initialize app');
    //   console.log('Hide splash screen');
    // });
    // this.router.events.subscribe((event: RouterEvent) => {
    //   if (event instanceof NavigationEnd) {
    //     console.log('NavigationEnd:', event);
    //     console.log('Hide splash screen');
    //   }
    // });
  }

  closeMenu() {
    this.menuController.close();
  }

  logOut() {
    this.tokenService.logOut();
    this.menuController.close();
    this.router.navigate(['/auth/login']);
    window.location.reload();
  }
}
