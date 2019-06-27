import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Promoter } from '../models/promoter';
import { map } from 'rxjs/operators';
import { Gig } from '../classes/gig';
import { Band } from '../models/band';
import { environment } from 'src/environments/environment.prod'


@Injectable({
  providedIn: 'root'
})
export class PromoterloginService {

  private loginStatusSubject = new Subject<number>();
  public  $loginStatus = this.loginStatusSubject.asObservable();
  private promoterGigSubject = new Subject<number>();
  public $promoterGig = this.promoterGigSubject.asObservable();
  private pullAllBandsSubject = new Subject<number>();
  public $pullAllBands = this.pullAllBandsSubject.asObservable();
  promoter;
  promoterStats;
  gigs = new Array<Gig>();
  allBands = new Array<Band>();

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): void {
    const payload = {
      email: email,
      password: password
    };

    this.httpClient.post(environment.url + '/promoters/login', payload, {
      observe: 'response'
      }).pipe(map(response => response.body as Promoter))
      .subscribe(response => {
        this.promoter = response;
        this.loginStatusSubject.next(200);
        localStorage.setItem('promoterId',response.id.toString());
        this.promoterGigs();
        this.pullAllBands();
      }, err => {
        this.loginStatusSubject.next(err.status);
      });

  }

  promoterGigs() {
    this.httpClient.get(environment.url + `/promoters/gigs/${this.promoter.id}`, {
      observe: 'response'
    }).pipe(map(response => response.body as Array<Gig>))
    .subscribe(response => {
      this.promoterGigSubject.next(200);
      response.forEach(element => {
        this.gigs.push(element);
        console.log(this.gigs);
      });
      }, err => { console.log('nothing is coming back');
    });

  }

  pullAllBands() {
    this.httpClient.get(environment.url + '/promoters/allbands', {
      observe: 'response'
    }).pipe(map(response => response.body as Array<Band>))
    .subscribe(response => {
      this.pullAllBandsSubject.next(200);
      response.forEach(element => {
        this.allBands.push(element);
        console.log(this.allBands);
      });
      }, err => {;
    });
  }

}
