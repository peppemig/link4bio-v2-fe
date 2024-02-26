import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  constructor(private http: HttpClient) {}

  checkIfUriExists(uri: string): Observable<boolean> {
    let endpoint = environment.services.page.collection.uriExists.replace(
      'URI',
      uri
    );
    return this.http.get<boolean>(endpoint, { headers: { skipAuth: 'true' } });
  }
}
