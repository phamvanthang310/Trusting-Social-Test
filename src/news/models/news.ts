import { Multimedia } from './multimedia';

export interface News {
  _id: string;
  web_url: string;
  snippet: string;
  multimedia: Array<Multimedia>;
  pub_date: string;
  source: string;
  headline: { main: string };
}
