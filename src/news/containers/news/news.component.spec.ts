import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsComponent } from './news.component';
import { NewsItemComponent } from '../../components/news-item/news-item.component';
import { MaterialModule } from '../../../share/material.module';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { NewsState, reducers } from '../../store/reducers';
import { LoadNewYorkTimes, LoadNewYorkTimesSuccess } from '../../store/actions';
import { By } from '@angular/platform-browser';
import { News, Response } from '../../models';
import { MatDialog } from '@angular/material';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let store: Store<NewsState>;
  let dialogSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        StoreModule.forRoot({news: combineReducers(reducers)}),
      ],
      declarations: [
        NewsComponent,
        NewsItemComponent,
      ],
      providers: [MatDialog]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    const dialog = TestBed.get(MatDialog);
    dialogSpy = spyOn(dialog, 'open');

    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Trusting Social - The New York Times'`, () => {
    expect(component.TITLE).toEqual('Trusting Social - The New York Times');
  });

  it('should dispatch LoadNewYorkTimes action to load news when created', () => {
    const action = new LoadNewYorkTimes(0);

    expect(component.loading$).toBeTruthy();
    expect(component.news$).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should display a list of news after the page is loaded', () => {
    const newYorkTimesResponse = {
      status: 'OK',
      response: {
        docs: [{
          _id: '1',
          snippet: 'news snippet #1',
        }, {
          _id: '2',
          snippet: 'news snippet #2',
        }, {
          _id: '3',
          snippet: 'news snippet #3',
        }],
      },
    } as Response;

    const action = new LoadNewYorkTimesSuccess(newYorkTimesResponse);

    store.dispatch(action);

    component.news$.subscribe((news: Array<News>) => {
      const expectedNews = newYorkTimesResponse.response.docs;

      expect(news.length).toBe(expectedNews.length);
      expect(news).toEqual(expectedNews);

    });

    component.loading$.subscribe((loading: boolean) => {
      expect(loading).toBeFalsy();
    });

  });

  it(`should dispatch LoadNewYorkTimes action when click 'LOAD MORE' button`, () => {
    const action = new LoadNewYorkTimes(1);
    const loadMoreBtn = fixture.debugElement.query(By.css('.news__load-more button'));

    loadMoreBtn.triggerEventHandler('click', null);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should open detail dialog when click on news item', async(() => {
    // TODO: Add unit test
  }));
});
