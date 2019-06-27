import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Gig } from '../classes/gig';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod'


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private RequestGigSubject = new Subject<number>();
  public  $requestGigStatus = this.RequestGigSubject.asObservable();
  gigs = new Array<Gig>();

  constructor(private httpClient: HttpClient) { }

  Request(): void {
    this.httpClient.get(environment.url + '/gigs/', {
      observe: 'response'
    }).pipe(map(response => response.body as Array<Gig>)).subscribe(response => {
      response.forEach(element => {
        this.gigs.push(element);
      });
      this.RequestGigSubject.next(200);
        }, err => {
    });
  }
}
