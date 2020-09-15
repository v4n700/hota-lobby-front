import { SeriesModel } from '../models/series.model';

export interface FilterSeriesByDaterangeRequest {
  dateFrom: Date;
  dateTo: Date;
  series: SeriesModel;
}
