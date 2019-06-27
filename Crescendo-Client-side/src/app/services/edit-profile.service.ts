import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Url } from 'url';
import { environment } from 'src/environments/environment.prod'


@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  private editStatusSubject = new Subject<number>();
  public $editStatus = this.editStatusSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  edit(id: number, email: string, bandName: string, bio: string,
       genre: string, debutDate: Date, socialmedia: Url, hourlyRate: number, imageURL: string, hashedPassword: string): void {
    const payload = {
    id: id,
    email: email,
    bandName: bandName,
    bio: bio,
    genre: genre,
    debutDate: debutDate,
    socialMedia: socialmedia,
    hourlyRate: hourlyRate,
    imageURL: imageURL
  };

  console.log(payload);

    this.httpClient.put(environment.url + '/bands/update', payload, {
    observe: 'response'}).subscribe(response => {
      this.editStatusSubject.next(200);
    }, err => {
      this.editStatusSubject.next(err.status);
    });
  }
}
