import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/login-user';
import { Observable, of } from 'rxjs';
import { JwtModel } from '../models/jwt-model';
import { environment } from 'src/environments/environment';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'http://localhost:8080/api/auth';

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  public login(usuario: LoginUser): Observable<JwtModel> {
    //return this.httpClient.post<JwtModel>(`${this.authURL}/login`, usuario, cabecera);
    // return fake Observable<JwtModel>
    return of({
      token: 'fake token',
      type: 'fake type',
      userName: 'fake nombreUsuario',
      authorities: ['fake authorities']
    });
  }

  userLogin(req: any){
    return this.http.post(`${this.API_URL}login`,req);
  }

  userRegister(req: any){
    return this.http.post(`${this.API_URL}register`,req);
  }

}