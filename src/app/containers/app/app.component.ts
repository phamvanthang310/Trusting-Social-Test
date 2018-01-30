import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly TITLE = 'Trusting Social';

  constructor(private title: Title) {
    title.setTitle(this.TITLE);
  }
}
