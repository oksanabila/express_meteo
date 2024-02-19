export function isValidCoordinates(lon: number, lat: number): boolean {
    return typeof lon === 'number' && typeof lat === 'number' &&
        lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90;
}