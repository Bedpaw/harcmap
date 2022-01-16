export type PointType = {
  pointId: string
  pointKey: string | null
  pointName: string | null
  pointLongitude: number | null
  pointLatitude: number | null
  pointType: string
  pointCategory: string
  pointCollectionTime: number | null
  pointAppearanceTime: number | null
  pointExpirationTime: number | null
}

export interface PointCategory {
  categoryId: string;
  categoryName: string;
  pointValue: number;
}
