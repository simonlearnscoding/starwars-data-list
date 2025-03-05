export type Planet = {
  name: string;
  diameter: string;
  climate: string;
  population: string;
};

export type PlanetError = {
  message: string;
  statusCode?: number;
};

export interface Person {
  name: string;
  height: string;
  mass: string;
  created: string;
  edited: string;
  homeworld: string;
  url: string;
}

export interface PeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export interface FetchPeopleResult {
  results: Person[];
  next: string | null;
}

export interface FetchPeopleOptions {
  limit?: number;
  next?: string | null;
  search?: string;
}
