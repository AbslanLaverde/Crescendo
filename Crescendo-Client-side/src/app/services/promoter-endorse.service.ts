import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod'


@Injectable({
  providedIn: 'root'
})
export class PromoterEndorseService {
  private registerStatusSubject = new Subject<number>();
  public $registerStatus = this.registerStatusSubject.asObservable();


  constructor(private httpClient: HttpClient) { }


  register(gigName: string, startTime: any, location: string, id: number, 
    Security: boolean, maxCapacity: number, closed: boolean) {
      const payload = {
        gigName: gigName,
        startTime: startTime,
        location: location,
        promoter: 
          {
            id : id
          },
        Security: Security,
        maxCapacity: maxCapacity,
        closed: closed
      };

      console.log(payload);

      this.httpClient.post(environment.url + '/gigs/create', payload, {
        observe: 'response'
      })
      .subscribe(response => {
        this.registerStatusSubject.next(200);
        alert('Gig created!');
      }, err => {
        this.registerStatusSubject.next(err.status);
        alert('Something has gone wrong!');
      });
  }



}
