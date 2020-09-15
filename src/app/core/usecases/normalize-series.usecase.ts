import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { timestamp } from 'rxjs/operators';
import { UseCase } from '../base/use-case';
import {SeriesModel} from '../models/series.model';

@Injectable({
  providedIn: 'root'
})
export class NormalizeSeriesUsecase implements UseCase<SeriesModel[], SeriesModel[]> {

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

  execute(params: SeriesModel[]): Observable<SeriesModel[]> {
    const allDates = params.reduce((acc, val) => acc.concat(val.timeStamps), []);
    const allTimestamps = allDates.map(date => new Date(date).getTime());
    const uniqueTimestamps = [...new Set(allTimestamps)];
    uniqueTimestamps.sort();
    const uniqueDates = uniqueTimestamps.map(t => new Date(t));

    const result: SeriesModel[] = [];
    for (let i = 0; i < params.length; i++)
    {
      if (params[i].data.length === 0) {
        result.push({
          data: [],
          timeStamps: [],
        });
        continue;
      }

      const values: number[] = [];
      for (let j = 0; j < uniqueDates.length; j++)
      {
        const value = this.getValueAtTime(uniqueDates[j], params[i]);
        values.push(value);
      }
      result.push({
        data: values,
        timeStamps: uniqueDates,
      });
    }

    return of(result);
  }
}
