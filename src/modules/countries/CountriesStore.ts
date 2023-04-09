import { injectable, singleton } from "tsyringe";

import StoreSlice from "../../utils/store/Slice";
import Store, { SliceTypeGeneric } from "../../utils/store/Store";

import { ICountry, ICountryDetails } from "./types";

type InitialStateType = {
  countriesData: ICountry[];
  countriesFilteredData: ICountry[];
  selectedCountry: ICountry;
  countriesChunks: ICountry[][];
  currentChunkIndex: number;
  countriesNameFilter: string;
  countriesRegionFilter: string;
  countriesSubRegionFilter: string;
  countriesLanguageFilter: string;
  countriesCurrencyFilter: string;
  countriesIndependentFilter: boolean;
  countriesTimezoneFilter: string;
  languages: string[];
  regions: string[];
  subregions: string[];
  currencies: string[];
  timezones: string[];
};

@singleton()
@injectable()
export class CountriesStore implements StoreSlice {
  private initialState: InitialStateType = {
    countriesData: [],
    countriesFilteredData: [],
    selectedCountry: null,
    countriesChunks: [],
    currentChunkIndex: 0,
    countriesNameFilter: "",
    countriesRegionFilter: "",
    countriesSubRegionFilter: "",
    countriesLanguageFilter: "",
    countriesCurrencyFilter: "",
    countriesIndependentFilter: false,
    countriesTimezoneFilter: "",
    languages: [],
    regions: [],
    subregions: [],
    currencies: [],
    timezones: [],
  };

  public data: SliceTypeGeneric<InitialStateType>;

  constructor(private store: Store) {
    this.data = store.createSlice("CountriesStore", this.initialState);
  }
}
