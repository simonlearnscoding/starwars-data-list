import { Person, PeopleResponse, FetchPeopleResult, FetchPeopleOptions } from '@/types';
import axios from 'axios';

/***
This function fetches people from the Star Wars API using Axios.
It fetches multiple pages until it reaches the limit.
***/

export const getPeople = async (options: FetchPeopleOptions): Promise<FetchPeopleResult> => {
  const { limit = 10, next, search } = options;
  const BASE_URL = 'https://swapi.dev/api/people/';

  // Determine the starting URL
  let url: string | null =
    next || (search ? `${BASE_URL}?search=${encodeURIComponent(search)}` : BASE_URL);
  let results: Person[] = [];

  while (url && results.length < limit) {
    try {
      //@ts-ignore
      const response = await axios.get<PeopleResponse>(url); // ✅ Axios already parses JSON
      results = results.concat(response.data.results); // ✅ Get data from `response.data`
      url = response.data.next; // ✅ Correctly update the next page URL
    } catch (error) {
      console.error('Error fetching people:', error);
      break;
    }
  }

  return {
    results: results.slice(0, limit),
    next: url,
  };
};
