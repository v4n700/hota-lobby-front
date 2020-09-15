import { SeriesModel } from '../models/series.model';

export interface NormalizeSeriesResponse {
  dates: Date[];
  series: SeriesModel[];
}
