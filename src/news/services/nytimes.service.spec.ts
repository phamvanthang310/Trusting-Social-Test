import { inject, TestBed } from '@angular/core/testing';

import { NYTimesServices } from './nytimes.services';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

class HttpClientMock {
  get(url): Observable<any> {
    return of({});
  }
}

describe('NYTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NYTimesServices,
        {provide: HttpClient, useClass: HttpClientMock}
      ]
    });
  });

  it('should be created', inject([NYTimesServices, HttpClient], (service: NYTimesServices) => {
    expect(service).toBeTruthy();
  }));

  it('be able to call The New York Times API', inject([NYTimesServices, HttpClient],
    (service: NYTimesServices, httpClient: HttpClient) => {
      const httpClientSpy = spyOn(httpClient, 'get');
      service.getNews(0);

      const args = httpClientSpy.calls.allArgs();
      expect(httpClientSpy.calls.count()).toBe(1, 'make request to NYT API');
      expect(args.length).toBe(1, 'url argument is passed by');
      expect(args[0]).toMatch('&page=0');
    }));
});
