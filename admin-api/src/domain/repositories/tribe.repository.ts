import { TribeMetricEntity } from '../model/tribe/tribe-metric.entity';

export interface ITribeRepository {
  getMetrics(id: number): Promise<TribeMetricEntity>;
}
