import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AvatarUploadService {
  constructor(private http: HttpClient) {}

  uploadAvatar(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', file);
    let endpoint = environment.services.image.collection.uploadAvatar;
    return this.http.post(endpoint, formData);
  }
}
