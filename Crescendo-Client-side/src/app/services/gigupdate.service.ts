import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod'


@Injectable({
  providedIn: 'root'
})
export class GigupdateService {
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

    this.httpClient.put('Crescendo/gigs/', payload, {
    observe: 'response'
    })
    .subscribe(response => {
    this.gigStatusSubject.next(200);
    }, err => {
     this.gigStatusSubject.next(err.status);
    });
  }
}
