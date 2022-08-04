interface PointDuration {
  startDate: number | null;
  endDate: number | null;
}
interface PointPosition {
  longitude: number;
  latitude: number;
}

export interface PointDTOCreate {
  pointName: string | null;
  pointType: string;
  pointDuration: PointDuration;
  pointPosition: PointPosition;
  pointCategoryId: string;
  pointDescription: string | null;
  pointSuccessMessage: string | null;
}

export interface PointDTO extends PointDTOCreate{
  pointId: string;
  pointKey: string;
  pointCollectedDate: number;
}

export type PointDTOUpdate = PointDTOCreate

export interface PointCategoryDTOCreate {
  categoryName: string;
  pointValue: number;
  pointStrokeColor: string;
  pointFillColor: string;
  categoryDescription: string | null;
}
export type PointCategoryDTOUpdate = PointCategoryDTOCreate;

export interface PointCategoryDTO extends PointCategoryDTOCreate{
  categoryId: string;
}
