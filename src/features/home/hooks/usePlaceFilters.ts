import { useMemo, useState } from 'react';
import type { Place } from '../../places/types';

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const toNumber = (value: string) => (value ? Number(value) : undefined);

export function usePlaceFilters(places: Place[]) {
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [stage, setStage] = useState<string | null>(null);

  const min = toNumber(minPrice);
  const max = toNumber(maxPrice);
  const invalidRange = min !== undefined && max !== undefined && min > max;

  const stageOptions = useMemo(
    () =>
      Array.from(new Set(places.map((place) => place.stageName))).sort((a, b) =>
        normalize(a).localeCompare(normalize(b)),
      ),
    [places],
  );

  const results = useMemo(() => {
    const q = normalize(query);

    return places.filter((place) => {
      if (stage && place.stageName !== stage) return false;
      if (min !== undefined && place.priceGs < min) return false;
      if (max !== undefined && place.priceGs > max) return false;
      if (q && !normalize(`${place.name} ${place.stageName}`).includes(q)) return false;
      return true;
    });
  }, [places, query, stage, min, max]);

  const hasActiveFilters = query !== '' || minPrice !== '' || maxPrice !== '' || stage !== null;

  const clear = () => {
    setQuery('');
    setMinPrice('');
    setMaxPrice('');
    setStage(null);
  };

  return {
    query,
    setQuery,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    stage,
    setStage,
    stageOptions,
    results,
    invalidRange,
    hasActiveFilters,
    clear,
  };
}