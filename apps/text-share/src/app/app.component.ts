import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'text-share-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly ENDPOINT = 'http://localhost:3333/api/test/'
  testMessage$ = this.http.get(this.ENDPOINT, {responseType: 'text'});
  constructor(private http: HttpClient) {}
}
