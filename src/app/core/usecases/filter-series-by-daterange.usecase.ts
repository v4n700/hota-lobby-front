import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { UseCase } from '../base/use-case';
import { FilterSeriesByDaterangeRequest } from './filter-series-by-daterange-request';
import { SeriesModel } from '../models/series.model';

interface SeriesItem {
  time: Date;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class FilterSeriesByDaterangeUsecase implements UseCase<FilterSeriesByDaterangeRequest, SeriesModel> {

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

  private filterByDateRange(from: Date, to: Date, series: SeriesModel): SeriesModel {
    if (series.data.length === 0) {
      return { data: [], timeStamps: []};
    }

    const seriesItems: SeriesItem[] = [];

    for (let i = 0; i < series.data.length; i++) {
      seriesItems[i] = {value: series.data[i], time: series.timeStamps[i]};
    }

    const dataInInterval = seriesItems.filter(item => from <= item.time && item.time <= to);

    const leftmostDataItem = {
      value: this.getValueAtTime(from, series),
      time: from,
    };

    const rightmostDataItem = {
      value: this.getValueAtTime(to, series),
      time: to,
    };

    const actuallyDataWithPossibleDuplicates = [];

    actuallyDataWithPossibleDuplicates.push({
      time: undefined,
      value: undefined,
    });

    actuallyDataWithPossibleDuplicates.push(leftmostDataItem);
    actuallyDataWithPossibleDuplicates.push(...dataInInterval);
    actuallyDataWithPossibleDuplicates.push(rightmostDataItem);

    const actuallyData = [];
    for (let i = 1; i < actuallyDataWithPossibleDuplicates.length; i++) {
      if (actuallyDataWithPossibleDuplicates[i].time !== actuallyDataWithPossibleDuplicates[i - 1].time) {
        actuallyData.push(actuallyDataWithPossibleDuplicates[i]);
      }
    }

    const resultSeries: SeriesModel = { data: [], timeStamps: [] };
    resultSeries.data.push(...actuallyData.map(item => item.value));
    resultSeries.timeStamps.push(...actuallyData.map(item => item.time));

    return resultSeries;
  }

  execute(params: FilterSeriesByDaterangeRequest): Observable<SeriesModel> {
    return of(this.filterByDateRange(params.dateFrom, params.dateTo, params.series));
  }
}
