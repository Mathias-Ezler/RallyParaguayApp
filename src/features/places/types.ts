export type Availability = 'available' | 'few' | 'full';

export type Place = {
  id: string;
  name: string;
  stageName: string;
  walkMinutes: number;
  priceGs: number;
  availability: Availability;
};