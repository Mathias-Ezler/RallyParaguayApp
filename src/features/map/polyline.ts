// Decodifica una polilínea en el formato de Google (precisión 1e5).
export function decodePolyline(encoded: string): { latitude: number; longitude: number }[] {
    const points: { latitude: number; longitude: number }[] = [];
    let index = 0;
    let lat = 0;
    let lng = 0;
  
    const readValue = () => {
      let result = 0;
      let shift = 0;
      let byte: number;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      return result & 1 ? ~(result >> 1) : result >> 1;
    };
  
    while (index < encoded.length) {
      lat += readValue();
      lng += readValue();
      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
  
    return points;
  }