import { Injectable } from '@angular/core';
import { Subject, pipe } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Band } from '../models/band';
import { Gig } from '../classes/gig';
import { environment } from 'src/environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class BandloginService {
  private RequestGigSubject = new Subject<number>();
  public  $requestGigStatus = this.RequestGigSubject.asObservable();
  assignedGigs = new Array<Gig>();
  invitedGigs = new Array<Gig>();
  band;
  private loginStatusSubject = new Subject<number>();
  public  $loginStatus = this.loginStatusSubject.asObservable();
  bandId;


  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): void {
    const payload = {
      email,
      password
    };

    this.httpClient.post(environment.url + '/bands/login', payload, {
      observe: 'response'
      }).pipe(map(response => response.body as Band)).subscribe(response => {
        this.loginStatusSubject.next(200);
        localStorage.setItem('bandId', response.id.toString());
        localStorage.setItem('imageURL', response.imageURL);
        localStorage.setItem('hashedPass', response.hashedPassword);
        this.assignedGigs.length = 0;
        this.invitedGigs.length = 0;
        this.AssignedGigs();
        this.Invite();
        this.getBandInfo();
      }, err => {
        this.loginStatusSubject.next(err.status);
      });
  }

  AssignedGigs(): void {
    this.httpClient.get(environment.url + `/bands/gigs/${localStorage.getItem('bandId')}`, {
      observe: 'response'
    }).pipe(map(response => response.body as Array<Gig>)).subscribe(response => {
        this.RequestGigSubject.next(200);
        response.forEach(element => {
          this.assignedGigs.push(element);
        });
        }, err => {
    });
  }

  Invite(): void {
    this.httpClient.get(environment.url + `/bands/invites/${localStorage.getItem('bandId')}`, {
      observe: 'response'
    }).pipe(map(response => response.body as Array<Gig>)).subscribe(response => {
        this.RequestGigSubject.next(200);
        response.forEach(element => {
          this.invitedGigs.push(element);
        });
        }, err => {
    });
  }

  Approve(): void {

    this.httpClient.put(environment.url + '/bands/resolve/' +
                        localStorage.getItem('bandId') + '/' + localStorage.getItem('gigId') + '/' + localStorage.getItem('status'), {
      observe: 'response'
    }).subscribe(response => {

      }, err => {
  });
  }

  getBandInfo(): void {
    this.httpClient.get(environment.url + `/bands/${localStorage.getItem('bandId')}`, {
      observe: 'response'
      }).pipe(map(response => response.body as Band)).subscribe(response => {
        this.loginStatusSubject.next(200);
        this.band = response;
      }, err => {
        this.loginStatusSubject.next(err.status);
      });
  }
}
