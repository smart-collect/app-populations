export type BinStatus =
  | "NORMAL"
  | "ALMOST_FULL"
  | "FULL"
  | "FIRE"
  | "OFFLINE";

export interface Bin {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: BinStatus;
  fill_level: number;
  last_measurement_at: string;
}

export async function fetchNearbyBins(
  lat: number,
  lng: number,
  radius: number
): Promise<Bin[]> {
  const url = new URL("/bins/nearby", window.location.origin);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lng", String(lng));
  url.searchParams.set("radius", String(radius));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Impossible de charger les bacs proches.");
  }

  const data = (await response.json()) as Bin[];
  return data.slice(0, 50);
}

export async function fetchBinDetails(id: string) {
  const response = await fetch(`/bins/${id}`);

  if (!response.ok) {
    throw new Error("Impossible de charger les détails du bac.");
  }

  return (await response.json()) as Bin;
}
