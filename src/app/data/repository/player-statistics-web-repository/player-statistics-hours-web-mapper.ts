import { Mapper } from '../../../core/base/mapper';
import { PlayerStatisticsHoursWebEntity } from './player-statistics-hours-web-entity';
import { PlayerStatisticsHoursModel } from '../../../core/models/player-statistics-hours.model';

export class PlayerStatisticsHoursWebMapper
  implements
    Mapper<PlayerStatisticsHoursWebEntity[], PlayerStatisticsHoursModel[]>
{
  mapFrom(
    param: PlayerStatisticsHoursWebEntity[]
  ): PlayerStatisticsHoursModel[] {
    return param.map(
      (item) =>
        ({
          hours: item.played,
          time: new Date(item.time),
        } as PlayerStatisticsHoursModel)
    );
  }

  mapTo(param: PlayerStatisticsHoursModel[]): PlayerStatisticsHoursWebEntity[] {
    return undefined;
  }
}
