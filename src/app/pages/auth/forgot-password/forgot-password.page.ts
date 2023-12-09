import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { environmentApp } from 'src/environment-app';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
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
    console.log('forgot-password');
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
