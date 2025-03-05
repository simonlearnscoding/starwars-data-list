import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Person, FetchPeopleResult, FetchPeopleOptions } from '@/types';
import { getPeople } from '@/services/getPeople';

export interface PeopleState {
  people: Person[];
  next: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PeopleState = {
  people: [],
  next: null,
  status: 'idle',
  error: null,
};

export const fetchPeople = createAsyncThunk<
  FetchPeopleResult,
  FetchPeopleOptions,
  { state: RootState }
>('people/fetchPeople', async (options, thunkAPI) => {
  try {
    return await getPeople(options);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPeople.fulfilled, (state, action: PayloadAction<FetchPeopleResult>) => {
        state.status = 'succeeded';
        const { results, next } = action.payload;
        // Only add new people that are not already in state
        const newResults = results.filter(
          (person) => !state.people.some((existing) => existing.url === person.url),
        );
        state.people.push(...newResults);
        state.next = next;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message || 'Something went wrong.';
      });
  },
});

export default peopleSlice.reducer;
