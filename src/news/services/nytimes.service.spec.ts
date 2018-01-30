import { inject, TestBed } from '@angular/core/testing';
import { NYTimesServices } from './nytimes.services';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NYTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NYTimesServices
      ],
    });
  });

  it('should be created', inject([NYTimesServices, HttpClient],
    (service: NYTimesServices, httpClient: HttpClient) => {
      expect(service).toBeTruthy();
      expect(httpClient).toBeTruthy();
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
