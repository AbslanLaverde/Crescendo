import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Band } from '../models/band';
import { map } from 'rxjs/operators';
import { PromoterhomeComponent } from '../components/promoter/promoterhome/promoterhome.component';
import { environment } from 'src/environments/environment.prod'


@Injectable({
  providedIn: 'root'
})
export class PromoterhomeService {
  

  private inviteStatusSubject = new Subject<number>();
  public $inviteStatus = this.inviteStatusSubject.asObservable();

  private bandExistsStatusSubject = new Subject<number>();
  public $bandExists = this.bandExistsStatusSubject.asObservable();

  private bandsPlayingStatusSubject = new Subject<number>();
  private $bandsPlayingObservable = this.bandsPlayingStatusSubject.asObservable();

  private updateGigStatusSubject = new Subject<number>();
  public $updateGigStatus = this.updateGigStatusSubject.asObservable();

  private cancelStatusSubject = new Subject<number>();
  public $cancelStatus = this.cancelStatusSubject.asObservable();

  public $bandsAtGig = new Array<Band>();
  public $bandsPlaying = new Array<Band>();


  constructor(private httpClient: HttpClient) { }

  inviteBands(gigId: number, bandId: number){
    this.httpClient.post(environment.url + `/promoters/invite/${bandId}/${gigId}`, {
        observe: 'response'
      }).subscribe(response => {
        this.inviteStatusSubject.next(200);
        alert('Invite successful!');
      }, err => {
        this.inviteStatusSubject.next(err.status);
        alert('Unable to invite band to your gig!');
      });
  }


  bandExists(gigId: number){
    this.httpClient.get(environment.url + `/gigs/allbands/${gigId}`, {
        observe: 'response'
    }).pipe(map(response => response.body as Array<Band>))
    .subscribe(response => {
      this.bandExistsStatusSubject.next(200);
      console.log('bands pulled successfully');
      response.forEach(element => {
        this.$bandsAtGig.push(element);
        console.log(this.$bandsAtGig);
       });
      }, err => { console.log('didnt pull anything');
     });
  }

  bandsPlaying(gigId: number) {
    this.httpClient.get(environment.url + `/gigs/bands/${gigId}`, {
        observe: 'response'
    }).pipe(map(response => response.body as Array<Band>))
    .subscribe(response => {
      response.forEach(element => {
        this.$bandsPlaying.push(element);
       });
      console.log(this.$bandsPlaying);
      this.bandsPlayingStatusSubject.next(200);
      }, err => { console.log('didnt pull anything');
     });
  }

  updateGig(gigName: string, startTime: any, location: string, Security: boolean, maxCapacity: any, closed: boolean) {
    const payload = {
      id: localStorage.getItem('gigId'),
      gigName: gigName,
      startTime: startTime, 
      promoter: 
      {
        id : localStorage.getItem('promoterId')
      },
      location: location,
      Security: Security,
      maxCapacity: maxCapacity,
      closed: closed
    };

    console.log(payload);

    this.httpClient.put(environment.url + '/gigs/updateGig', payload, {
      observe: 'response'
    })
    .subscribe(response => {
      this.updateGigStatusSubject.next(200);
      alert('Gig updated!');
    }, err => {
      this.updateGigStatusSubject.next(err.status);
      alert('Something has gone terribly wrong!')
    });
  }

  cancel(){
    this.httpClient.delete(environment.url + `/gigs/${localStorage.getItem('gigId')}` , {
      observe: 'response'
    }).subscribe( response => {
      this.cancelStatusSubject.next(200);
      alert('Gig cancelled!');
      }, err => {
      this.cancelStatusSubject.next(err.status);
      alert('Something has gone terribly wrong!')
    });
  }

  

}
