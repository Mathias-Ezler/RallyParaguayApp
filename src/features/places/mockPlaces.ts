import type { Place } from './types';

// MOCK: datos de ejemplo hasta que exista backend. Nombres y precios inventados.
export const MOCK_PLACES: Place[] = [
  { id: 'p1', name: 'Estacionamiento 1', stageName: 'Cambyretá', walkMinutes: 5, priceGs: 50000, availability: 'available' },
  { id: 'p2', name: 'Estacionamiento 2', stageName: 'Yerbateras', walkMinutes: 12, priceGs: 40000, availability: 'few' },
  { id: 'p3', name: 'Estacionamiento 3', stageName: 'Hohenau', walkMinutes: 8, priceGs: 60000, availability: 'available' },
  { id: 'p4', name: 'Estacionamiento 4', stageName: 'Bella Vista', walkMinutes: 15, priceGs: 30000, availability: 'full' },
];