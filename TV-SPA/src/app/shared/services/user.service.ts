import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

const httpOption = {
  headers: new HttpHeaders({
    "Authorization": "Bearer " + localStorage.getItem('token') as string
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = "http://localhost:5000/api/users/";

  constructor(private http: HttpClient, private authService: AuthService) { }

  updateClient(model: any) {
    let formData = new FormData();
    formData.append("profileimage", model, model.name)

    return this.http.put(
      this.usersUrl + 'update-client/' + this.authService.decodedToken.nameid,
      formData, httpOption)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user.result.succeeded) {
            console.log(user);
          }
        })
      )
  }
}