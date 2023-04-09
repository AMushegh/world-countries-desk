import autobind from "autobind-decorator";
import { injectable, singleton } from "tsyringe";

import { CountriesService } from "./services/CountriesService";
import { ICountry } from "./types";

@injectable()
@singleton()
@autobind
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  public async onCounterMount() {
    await this.countriesService.getCountriesData();
    this.countriesService.setCountriesChunks();
  }

  public onPagintaionButtonClick(page: number) {
    this.countriesService.setCurrentChunkIndex(page - 1);
  }

  public onNameFilterChange(value: string) {
    this.countriesService.setNameFilter(value);
  }

  public onLangugeFilterChange(value: string) {
    this.countriesService.setLanguageFilter(value);
  }

  public onRegionFilterChange(value: string) {
    this.countriesService.setRegionFilter(value);
  }

  public onSubregionFilterChange(value: string) {
    this.countriesService.setSubregionFilter(value);
  }

  public onCurrencyFilterChange(value: string) {
    this.countriesService.setCurrencyFilter(value);
  }

  public onIndependentFilterChange(value: boolean) {
    this.countriesService.setIndependentFilter(value);
  }

  public onTimezoneFilterChange(value: string) {
    this.countriesService.setTimezoneFilter(value);
  }

  public onClearAllFiltersButtonClick() {
    this.countriesService.clearAllFilters();
  }

  public onSelectedCountryModalClose() {
    this.countriesService.clearSelecredCountry();
  }

  public onCountryTableRowClick(country: ICountry) {
    this.countriesService.setSelecredCountry(country);
  }

  public onSortClick(property: keyof ICountry, order: boolean) {
    this.countriesService.updateBySortChange(property, order);
  }
}
