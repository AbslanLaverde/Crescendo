import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Gig } from '../classes/gig';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod'


@Injectable({
  providedIn: 'root'
})
export class GigregistrationService {
  private gigStatusSubject = new Subject<number>();
  public $gigStatus = this.gigStatusSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  register(name: string, startTime: any, location: string, Security: boolean, capacity: number,
           closed: boolean): void {
    const payload = {
      name: name,
      startTime: startTime,
      location: location,
      Security: Security,
      capacity: capacity,
      closed: closed 
    };

    console.log(payload);

    this.httpClient.post('Crescendo/gigs/', payload, {
    observe: 'response'}).pipe(map(response => response.body as Gig))
    .subscribe(response => {
    this.gigStatusSubject.next(200);
    }, err => {
     this.gigStatusSubject.next(err.status);
    });
  }
}
