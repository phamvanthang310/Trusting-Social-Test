import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NYTimesServices {
  private readonly API_KEY = '5763846de30d489aa867f0711e2b031c';

  constructor(private http: HttpClient) {
  }

  getNews(page: number): Observable<any> {
    return this.http.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${this.API_KEY}&page=${page}`);
  }
}
