import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = "http://localhost:5000/api/auth/";
  usersUrl = "http://localhost:5000/api/users/";
  confirmEmailUrl = "http://localhost:4200/confirm-email";

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.authUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user.result.succeeded) {
          localStorage.setItem('token', user.token);
        }
      })
    )
  }

  registerUser(model: any, type: string) {
    let headers = new HttpHeaders({
      'confirmEmailUrl': this.confirmEmailUrl
    });
    let options = { headers: headers };
    return this.http.post(this.usersUrl + 'create-' + type, model, options);
  }

  confirmEmail(model: any) {
    return this.http.post(this.authUrl + 'confirm-email', model);
  }
}