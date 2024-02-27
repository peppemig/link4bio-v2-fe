import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from 'src/app/shared/models/link.model';
import { environment } from 'src/environments/environment';

interface LinkPayload {
  linkId: number;
  title: string;
  subtitle: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(private http: HttpClient) {}

  saveLinksToPage(uri: string, links: Link[]): Observable<Link[]> {
    let endpoint = environment.services.link.collection.saveLinksTopage.replace(
      'URI',
      uri
    );
    return this.http.post<Link[]>(endpoint, links);
  }

  editLink(linkId: number, payload: LinkPayload): Observable<Link> {
    let endpoint = environment.services.link.collection.editLink.replace(
      'LINKID',
      linkId.toString()
    );
    return this.http.put<Link>(endpoint, payload);
  }

  deleteLink(linkId: number): Observable<any> {
    let endpoint = environment.services.link.collection.deleteLink.replace(
      'LINKID',
      linkId.toString()
    );
    return this.http.delete<any>(endpoint);
  }
}
