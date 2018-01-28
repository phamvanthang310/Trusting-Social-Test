import { News } from './news';

export interface Response {
  status: string;
  copyright: string;
  response: { docs: Array<News> };
}
