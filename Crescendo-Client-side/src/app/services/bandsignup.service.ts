import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BandsignupService {
  private signupStatusSubject = new Subject<number>();
  public $signupStatus = this.signupStatusSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  signup(email: string, password: string, name: string, bio: string,
         genre: string, debutDate: any, promotion: any, hourlyRate: number, imageURL: string): void {
    const payload = {
      email: email,
      password: password,
      bandName: name,
      bio: bio,
      genre: genre,
      debutDate: debutDate,
      socialMedia: promotion,
      hourlyRate: hourlyRate,
      imageURL: imageURL
    };

    console.log(payload);

    this.httpClient.post('http://ec2-52-15-213-35.us-east-2.compute.amazonaws.com:8081/Crescendo/bands/signup', payload, {
      observe: 'response'
      })
      .subscribe(response => {
        this.signupStatusSubject.next(200);
      }, err => {
        this.signupStatusSubject.next(err.status);
      });
  }
}
