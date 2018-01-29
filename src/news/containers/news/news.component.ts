import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewsState } from '../../store/reducers';
import { Observable } from 'rxjs/Observable';
import { getNewYorkTimesLoading, getNewYorkTimesNews } from '../../store/selectors';
import { LoadNewYorkTimes } from '../../store/actions';
import { News } from '../../models';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  private page = 0;

  news$: Observable<Array<News>>;
  loading$: Observable<boolean>;

  constructor(private store: Store<NewsState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadNewYorkTimes(this.page));
    this.news$ = this.store.select(getNewYorkTimesNews);
    this.loading$ = this.store.select(getNewYorkTimesLoading);
  }

  trackByNews(index: number, news: News) {
    return news._id;
  }

  loadMore() {
    this.store.dispatch(new LoadNewYorkTimes(++this.page));
  }

  onClick(news: News) {
    console.log(news);
  }
}
