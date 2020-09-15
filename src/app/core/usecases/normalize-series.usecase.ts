import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UseCase } from '../base/use-case';
import { SeriesModel } from '../models/series.model';
import { NormalizeSeriesResponse } from './normalize-series-response';

@Injectable({
  providedIn: 'root'
})
export class NormalizeSeriesUsecase implements UseCase<SeriesModel[], NormalizeSeriesResponse> {

  private getValueAtTime(time: Date, series: SeriesModel, initial = 0): number {
    if (series.data.length === 0) {
      return initial;
    }

    let prevValue = initial;
    for (let i = 0; i < series.data.length; i++) {
      if (time.getTime() < series.timeStamps[i].getTime()) {
        return prevValue;
      } else if (time.getTime() === series.timeStamps[i].getTime()) {
        return series.data[i];
      }

      prevValue = series.data[i];
    }

    return series.data[series.data.length - 1];
  }

  execute(params: SeriesModel[]): Observable<NormalizeSeriesResponse> {
    const allDates = params.reduce((acc, val) => acc.concat(val.timeStamps), []);
    const allTimestamps = allDates.map(date => new Date(date).getTime());
    const uniqueTimestamps = [...new Set(allTimestamps)];
    uniqueTimestamps.sort();
    const uniqueDates = uniqueTimestamps.map(t => new Date(t));

    const result: SeriesModel[] = [];
    for (const param of params)
    {
      if (param.data.length === 0) {
        result.push({
          data: [],
          timeStamps: [],
        });
        continue;
      }

      const values: number[] = [];
      for (const uniqueDatesValue of uniqueDates)
      {
        const value = this.getValueAtTime(uniqueDatesValue, param);
        values.push(value);
      }
      result.push({
        data: values,
        timeStamps: uniqueDates,
      });
    }

    return of({
      dates: uniqueDates,
      series: result,
    });
  }
}
