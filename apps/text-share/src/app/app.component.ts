import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TextInterface } from '@text-share/api-interfaces';

@Component({
  selector: 'text-share-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<TextInterface>('/api/hello');
  constructor(private http: HttpClient) {}
}
