import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Button } from 'src/app/shared/models/button.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  constructor(private http: HttpClient) {}

  saveButtonsToPage(uri: string, buttons: Button[]): Observable<Button[]> {
    let endpoint =
      environment.services.button.collection.saveButtonsToPage.replace(
        'URI',
        uri
      );
    return this.http.post<Button[]>(endpoint, buttons);
  }

  editButton(buttonId: number, url: string): Observable<Button> {
    let endpoint = environment.services.button.collection.editButton.replace(
      'BUTTONID',
      buttonId.toString()
    );
    return this.http.put<Button>(endpoint, { url });
  }

  deleteButton(buttonId: number): Observable<any> {
    let endpoint = environment.services.button.collection.deleteButton.replace(
      'BUTTONID',
      buttonId.toString()
    );
    return this.http.delete(endpoint);
  }
}
