import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsItemComponent } from './news-item.component';
import { By } from '@angular/platform-browser';

describe('NewsItemComponent', () => {
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;
    component.details = {
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
      web_url: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display news item', () => {
    const newsHeadline = fixture.debugElement.query(By.css('.news__headline')).nativeElement.textContent;
    const newsPubDate = fixture.debugElement.query(By.css('.news__pub-date')).nativeElement.textContent;
    const newsMultimediaSrc = fixture.debugElement.query(By.css('.news__multimedia img')).properties.src;
    const newsSource = fixture.debugElement.query(By.css('.news__source')).nativeElement.textContent;

    expect(newsHeadline).toContain('news head line');
    expect(newsPubDate).toContain('Dec 16, 2017, 3:00:00 PM');
    expect(newsMultimediaSrc).toContain('http://www.nytimes.com/image/sample.jpg');
    expect(newsSource).toContain('news source');
  });
});
