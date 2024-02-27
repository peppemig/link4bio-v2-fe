import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/shared/models/theme.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private http: HttpClient) {}

  saveThemeToPage(uri: string, theme: Theme): Observable<Theme> {
    let endpoint =
      environment.services.theme.collection.saveThemeToPage.replace('URI', uri);
    return this.http.post<Theme>(endpoint, theme);
  }
}
