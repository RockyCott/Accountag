import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { environmentApp } from 'src/environment-app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formData: UntypedFormGroup;
  isLoading: boolean = false;
  app_name = environmentApp.APP_NAME;
  logoUrl: SafeResourceUrl;
  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    const logoPath = 'assets/img/logo-removebg.png';
    this.logoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(logoPath);
  }

  ngOnInit() {
    console.log('register');
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
