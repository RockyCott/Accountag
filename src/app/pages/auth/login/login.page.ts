import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { AlertController } from '@ionic/angular';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { environmentApp } from 'src/environment-app';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // form: any = {};
  // usuario: LoginUser;
  // nombreUser: string;
  // isLogged = false;
  // isLoginFail = false;
  // roles: string[] = [];
  // errorMsg = '';

  // constructor(
  //   private authService: AuthService,
  //   private tokenService: TokenService,
  //   private alertController: AlertController
  // ) {}

  // ngOnInit() {
  //   if (this.tokenService.getToken()) {
  //     // comprobamos los valores del token
  //     console.log('Nombre: ' + this.tokenService.getUserName());
  //     console.log('Token: ' + this.tokenService.getToken());
  //     console.log('Roles: ' + this.tokenService.getAuthorities());
  //     this.nombreUser = this.tokenService.getUserName();
  //     this.isLogged = true;
  //     this.isLoginFail = false;
  //     this.roles = this.tokenService.getAuthorities();
  //   }
  // }

  // onLogin() {
  //   this.usuario = new LoginUser(this.form.nombreUsuario, this.form.password);
  //   this.authService.login(this.usuario).subscribe({
  //     next: (data) => {
  //       this.tokenService.setToken(data.token);
  //       this.tokenService.setUserName(data.userName);
  //       this.tokenService.setAuthorities(data.authorities);

  //       this.isLogged = true;
  //       this.isLoginFail = false;
  //       this.roles = this.tokenService.getAuthorities();
  //       window.location.reload();
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //       this.isLogged = false;
  //       this.isLoginFail = true;
  //       this.errorMsg = err.error.message;
  //       this.presentAlert();
  //     },
  //   });
  // }

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Fail en el login',
  //     message: this.errorMsg,
  //     buttons: ['Aceptar'],
  //   });

  //   await alert.present();
  // }

  // onLogout() {
  //   this.tokenService.logOut();
  //   window.location.reload();
  // }
  formData: UntypedFormGroup;
  isLoading: boolean = false;
  app_name = environmentApp.APP_NAME;
  logoUrl: SafeResourceUrl;
  constructor(private fb: UntypedFormBuilder, private auth: AuthService, private sanitizer: DomSanitizer) {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    const logoPath = 'assets/img/logo-removebg.png';
    this.logoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(logoPath);
  }

  ngOnInit() {
    console.log('login');
  }

  login() {
    let formData: any = new FormData();
    if (this.formData.valid) {
      this.isLoading = true;
      formData.append('email', this.formData.get('email').value);
      formData.append('password', this.formData.get('password').value);
      console.log(this.formData);
      this.auth.userLogin(formData).subscribe((data: any) => {
        console.log(data);
      });
    }
  }

  register() {
    let formData: any = new FormData();
    if (this.formData.valid) {
      this.isLoading = true;
      formData.append('name', this.formData.get('name').value);
      formData.append('email', this.formData.get('email').value);
      formData.append('password', this.formData.get('password').value);
      console.log(this.formData);
      this.auth.userRegister(formData).subscribe((data: any) => {
        console.log(data);
      });
    }
  }

  /**
   * Abre una página externa en el navegador prederterminado
   * del dispositivo y no en la app
   * @param page - Página a abrir
   */
  public openPage(page: string): void {
    window.open(page, '_system', 'location=yes');
  }
}
