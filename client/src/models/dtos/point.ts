interface PointDuration {
  startDate: string | null;
  endDate: string | null;
}
interface PointPosition {
  longitude: number;
  latitude: number;
}

export interface PointDTOCreate {
  // pointId -> Remove
  pointName: string;
  pointKey: string;
  pointType: string;
  pointDuration: PointDuration;
  pointPosition: PointPosition;
  pointCategoryId: string;
}

export interface PointDTO extends PointDTOCreate{
  pointId: string;
  pointCollectedDate: string;
}

export type PointDTOUpdate = PointDTOCreate

export interface PointCategoryDTOCreate {
  categoryName: string;
  pointValue: number;
  pointShape: string;
}

export interface PointCategoryDTO extends PointCategoryDTOCreate{
  categoryId: string;
}
