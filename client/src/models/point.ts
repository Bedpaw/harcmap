export type PointType = {
  pointId: string
  pointKey: string | null
  pointName: string | null
  pointLongitude: number
  pointLatitude: number
  pointType: string
  pointCategoryId: string
  pointCollectionTime: number | null
  pointAppearanceTime: number | null
  pointExpirationTime: number | null
  pointDescription: string | null
  pointSuccessMessage: string | null
}

export interface PointCategory {
  categoryId: string;
  categoryName: string;
  pointValue: number;
  pointFillColor: string;
  pointStrokeColor: string;
  pointCategory: string | null;
}
