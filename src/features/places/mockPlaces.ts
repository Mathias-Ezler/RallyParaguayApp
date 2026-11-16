import type { Place } from './types';

// MOCK: datos de ejemplo hasta que exista backend. Nombres y precios inventados.
export const MOCK_PLACES: Place[] = [
  { id: 'p1', name: 'Estacionamiento 1', stageName: 'Cambyretá', walkMinutes: 5, priceGs: 50000, availability: 'available' },
  { id: 'p2', name: 'Estacionamiento 2', stageName: 'Yerbateras', walkMinutes: 12, priceGs: 40000, availability: 'few' },
  { id: 'p3', name: 'Estacionamiento 3', stageName: 'Hohenau', walkMinutes: 8, priceGs: 60000, availability: 'available' },
  { id: 'p4', name: 'Estacionamiento 4', stageName: 'Bella Vista', walkMinutes: 15, priceGs: 30000, availability: 'full' },
  { id: 'p5', name: 'Estacionamiento 5', stageName: 'Trinidad', walkMinutes: 10, priceGs: 45000, availability: 'available' },
  { id: 'p6', name: 'Estacionamiento 6', stageName: 'Artigas Este', walkMinutes: 6, priceGs: 55000, availability: 'few' },
  { id: 'p7', name: 'Estacionamiento 7', stageName: 'Encarnación', walkMinutes: 4, priceGs: 70000, availability: 'available' },
  { id: 'p8', name: 'Estacionamiento 8', stageName: 'Nueva Alborada', walkMinutes: 20, priceGs: 25000, availability: 'available' },
];