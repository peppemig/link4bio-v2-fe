import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(private http: HttpClient) {}

  checkIfUriExists(uri: string): Observable<boolean> {
    let endpoint = environment.services.page.collection.uriExists.replace(
      'URI',
      uri
    );
    return this.http.get<boolean>(endpoint, { headers: { skipAuth: 'true' } });
  }

  checkIfUserHasPage(): Observable<boolean> {
    let endpoint = environment.services.page.collection.userHasPage;
    return this.http.get<boolean>(endpoint);
  }

  getPageDataByUserId(): Observable<Page> {
    let endpoint = environment.services.page.collection.pageByUserId;
    return this.http.get<Page>(endpoint);
  }

  getPageDataByUri(uri: string): Observable<Page> {
    let endpoint = environment.services.page.collection.pageByUri.replace(
      'URI',
      uri
    );
    return this.http.get<Page>(endpoint, {
      headers: { skipAuth: 'true', skipError: 'true' },
    });
  }
}
