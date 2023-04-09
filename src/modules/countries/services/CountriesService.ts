import autobind from "autobind-decorator";
import { singleton, injectable } from "tsyringe";

import { chunkArray, sortTimezones } from "../../../utils/helpers";

import { CountriesApiService } from "./CountriesApiService";
import { CountriesStore } from "../CountriesStore";

import { ICountry, ICountryDetails } from "../types";
import { COUNTRIES_CHUNK_LENGTH } from "../constants/countries";
import { CountriesAdapter } from "./CountriesAdapter";

@injectable()
@singleton()
@autobind
export class CountriesService {
  constructor(
    private countriesApiService: CountriesApiService,
    private countriesStore: CountriesStore,
    private countriesAdapter: CountriesAdapter
  ) {}

  private createCountriesChunks(countries: ICountry[]) {
    return chunkArray(countries, COUNTRIES_CHUNK_LENGTH);
  }

  private filterCountries() {
    const nameFilter = this.countriesStore.data.countriesNameFilter.value;
    const languageFilter =
      this.countriesStore.data.countriesLanguageFilter.value;
    const regionFilter = this.countriesStore.data.countriesRegionFilter.value;
    const subRegionFilter =
      this.countriesStore.data.countriesSubRegionFilter.value;
    const currencyFilter =
      this.countriesStore.data.countriesCurrencyFilter.value;
    const independentFilter =
      this.countriesStore.data.countriesIndependentFilter.value;
    const timezoneFilter =
      this.countriesStore.data.countriesTimezoneFilter.value;

    let filteredCountries = this.countriesStore.data.countriesData.value.filter(
      (country) => {
        // filter by name, native or capital names
        const nameMatch = nameFilter
          ? country.countryName
              .toLowerCase()
              .includes(nameFilter.toLowerCase()) ||
            country.capitalName
              .toLowerCase()
              .includes(nameFilter.toLowerCase()) ||
            country.countryNativeName
              .toLowerCase()
              .includes(nameFilter.toLowerCase())
          : true;

        // filter by language
        const languageMatch = languageFilter
          ? country.language.toLowerCase() === languageFilter.toLowerCase()
          : true;

        // filter by region
        const regionMatch = regionFilter
          ? country.region.toLowerCase().includes(regionFilter.toLowerCase())
          : true;

        // filter by sub-region
        const subRegionMatch = subRegionFilter
          ? country.subRegion
              .toLowerCase()
              .includes(subRegionFilter.toLowerCase())
          : true;

        // filter by currency
        const currencyMatch = currencyFilter
          ? country.currency === currencyFilter
          : true;

        // filter by independent state
        const independentyMatch = independentFilter
          ? country.independent
          : true;

        // filter by timezone
        const timezoneMatch = timezoneFilter
          ? country.timezones.includes(timezoneFilter)
          : true;

        return (
          nameMatch &&
          languageMatch &&
          regionMatch &&
          subRegionMatch &&
          currencyMatch &&
          independentyMatch &&
          timezoneMatch
        );
      }
    );

    if (filteredCountries.length === 0) {
      filteredCountries = [];
    }

    this.countriesStore.data.countriesFilteredData.next(filteredCountries);
    this.countriesStore.data.currentChunkIndex.next(0);
    this.setCountriesChunks();
  }

  private setFiltersSelectOptions(countryDetails: ICountryDetails[]) {
    const allLanguages = countryDetails.flatMap((country) =>
      Object.values(country.languages ?? {})
    );
    const allRegions = countryDetails.flatMap(
      (country) => country.region ?? ""
    );
    const allSubregions = countryDetails.flatMap(
      (country) => country.subregion ?? ""
    );
    const allCurrencies = countryDetails.flatMap((country) =>
      Object.keys(country.currencies ?? {})
    );
    const allTimezones = countryDetails.flatMap(
      (country) => country.timezones ?? []
    );

    this.countriesStore.data.languages.next([...new Set(allLanguages)].sort());
    this.countriesStore.data.regions.next([...new Set(allRegions)].sort());
    this.countriesStore.data.subregions.next(
      [...new Set(allSubregions)].sort()
    );
    this.countriesStore.data.currencies.next(
      [...new Set(allCurrencies)].sort()
    );
    this.countriesStore.data.timezones.next(
      sortTimezones([...new Set(allTimezones)])
    );
  }

  private sortCountriesByProperty(
    countries: ICountry[],
    property: keyof ICountry,
    ascending: boolean = true
  ): ICountry[] {
    const sortDirection = ascending ? 1 : -1;
    return countries.sort((a, b) => {
      if (a[property] < b[property]) {
        return -1 * sortDirection;
      } else if (a[property] > b[property]) {
        return 1 * sortDirection;
      }
      return 0;
    });
  }

  public updateBySortChange(property: keyof ICountry, order: boolean) {
    const sorted = this.sortCountriesByProperty(
      this.countriesStore.data.countriesData.value,
      property,
      order
    );

    this.countriesStore.data.countriesData.next(sorted);

    this.filterCountries();
  }

  public async getCountriesData() {
    const resp = await this.countriesApiService.getCountries();
    if (resp) {
      const mappedCountries = this.countriesAdapter.mapCountriesResponse(
        resp.data
      );

      this.setFiltersSelectOptions(resp.data);
      const sortedCountries = this.sortCountriesByProperty(
        mappedCountries,
        "countryName",
        true
      );

      this.countriesStore.data.countriesData.next(sortedCountries);
      this.countriesStore.data.countriesFilteredData.next(sortedCountries);
    }
  }

  public async setCountriesChunks() {
    if (this.countriesStore.data.countriesFilteredData.value.length) {
      const chunks = this.createCountriesChunks(
        this.countriesStore.data.countriesFilteredData.value
      );
      this.countriesStore.data.countriesChunks.next(chunks);
    } else {
      this.countriesStore.data.countriesChunks.next([]);
    }
  }

  public setCurrentChunkIndex(index: number) {
    this.countriesStore.data.currentChunkIndex.next(index);
  }

  public setNameFilter(filterValue: string) {
    this.countriesStore.data.countriesNameFilter.next(filterValue);
    this.filterCountries();
  }

  public setLanguageFilter(filterValue: string) {
    this.countriesStore.data.countriesLanguageFilter.next(filterValue);
    this.filterCountries();
  }

  public setRegionFilter(filterValue: string) {
    this.countriesStore.data.countriesRegionFilter.next(filterValue);
    this.filterCountries();
  }

  public setSubregionFilter(filterValue: string) {
    this.countriesStore.data.countriesSubRegionFilter.next(filterValue);
    this.filterCountries();
  }

  public setCurrencyFilter(filterValue: string) {
    this.countriesStore.data.countriesCurrencyFilter.next(filterValue);
    this.filterCountries();
  }

  public setIndependentFilter(filterValue: boolean) {
    this.countriesStore.data.countriesIndependentFilter.next(filterValue);
    this.filterCountries();
  }

  public setTimezoneFilter(filterValue: string) {
    this.countriesStore.data.countriesTimezoneFilter.next(filterValue);
    this.filterCountries();
  }

  public clearAllFilters() {
    this.countriesStore.data.countriesNameFilter.next("");
    this.countriesStore.data.countriesLanguageFilter.next("");
    this.countriesStore.data.countriesTimezoneFilter.next("");
    this.countriesStore.data.countriesIndependentFilter.next(false);
    this.countriesStore.data.countriesRegionFilter.next("");
    this.countriesStore.data.countriesSubRegionFilter.next("");
    this.countriesStore.data.countriesCurrencyFilter.next("");

    this.filterCountries();
  }

  public clearSelecredCountry() {
    this.countriesStore.data.selectedCountry.next(null);
  }

  public setSelecredCountry(coutry: ICountry) {
    this.countriesStore.data.selectedCountry.next(coutry);
  }
}
