import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewsState } from '../../store/reducers';
import { Observable } from 'rxjs/Observable';
import { getNewYorkTimesLoading, getNewYorkTimesNews } from '../../store/selectors';
import { LoadNewYorkTimes } from '../../store/actions';
import { News } from '../../models';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewsDetailComponent } from '../../components';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  private page = 0;

  news$: Observable<Array<News>>;
  loading$: Observable<boolean>;

  constructor(private title: Title, private store: Store<NewsState>, private dialog: MatDialog) {
    title.setTitle('Trusting Social - The New York Times');
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
    const config: MatDialogConfig = {
      data: news,
      width: '1000px'
    };
    const dialogRef = this.dialog.open(NewsDetailComponent, config);
  }
}
