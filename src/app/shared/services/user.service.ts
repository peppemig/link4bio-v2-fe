import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

interface UserDetailsPayload {
  uri: string;
  location: string;
  bio: string;
}

interface UserInfosPayload {
  displayName: string;
  location: string;
  bio: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    let endpoint = environment.services.user.collection.getUser;
    return this.http.get<User>(endpoint);
  }

  saveUserDetails(payload: UserDetailsPayload): Observable<Page> {
    let endpoint = environment.services.user.collection.saveUserDetails;
    return this.http.post<Page>(endpoint, payload);
  }

  updateUserInfos(payload: UserInfosPayload): Observable<User> {
    let endpoint = environment.services.user.collection.updateUserInfos;
    return this.http.put<User>(endpoint, payload);
  }
}
