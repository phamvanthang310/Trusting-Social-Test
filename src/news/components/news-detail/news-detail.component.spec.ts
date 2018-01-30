import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsDetailComponent } from './news-detail.component';
import { MaterialModule } from '../../../share/material.module';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material';

describe('NewsDetailComponent', () => {
  let component: NewsDetailComponent;
  let fixture: ComponentFixture<NewsDetailComponent>;

  const news = {
    _id: '123',
    pub_date: '2017-12-16T15:00:00',
    snippet: 'news snippet',
    source: 'news source',
    multimedia: [{
      subType: 'xlarge',
      url: 'image/sample.jpg'
    }],
    headline: {
      main: 'news head line'
    },
    web_url: 'http://localhost:4200/mock'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsDetailComponent],
      imports: [MaterialModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: news}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display news details', () => {
    const newsHeadline = fixture.debugElement.query(By.css('.news__headline')).nativeElement.textContent;
    const newsSnippet = fixture.debugElement.query(By.css('.news__snippet')).nativeElement.textContent;
    const newsWebUrl = fixture.debugElement.query(By.css('.news__web-url')).properties.href;
    const newsPubDate = fixture.debugElement.query(By.css('.news__pub-date')).nativeElement.textContent;
    const newsMultimediaSrc = fixture.debugElement.query(By.css('.news__multimedia img')).properties.src;
    const newsSource = fixture.debugElement.query(By.css('.news__source')).nativeElement.textContent;

    expect(newsHeadline).toContain('news head line');
    expect(newsSnippet).toContain('news snippet');
    expect(newsWebUrl).toContain('http://localhost:4200/mock');
    expect(newsPubDate).toContain('Dec 16, 2017, 3:00:00 PM');
    expect(newsMultimediaSrc).toContain('http://www.nytimes.com/image/sample.jpg');
    expect(newsSource).toContain('news source');
  });
});
