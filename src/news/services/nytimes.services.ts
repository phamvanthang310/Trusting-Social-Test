import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NYTimesServices {

  constructor(private http: HttpClient) {

  }

  getNews(): Observable<any> {
    console.log('NYTimesServices#getNews');
    return this.http.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
      'api-key=5763846de30d489aa867f0711e2b031c&q=singapore&page=0');
  }

}
