import { singleton } from "tsyringe";

import { ICountry, ICountryDetails } from "../types";

@singleton()
export class CountriesAdapter {
  public mapCountriesResponse(counries: ICountryDetails[]): ICountry[] {
    return counries.map((country) => {
      let language = "";
      if (country.languages && Object.values(country.languages).length > 0) {
        language = Object.values(country.languages)[0];
      }

      let currency = "";
      let currencySymbol = "";
      if (country.currencies && Object.keys(country.currencies).length > 0) {
        currency = Object.keys(country.currencies)[0];
        currencySymbol = country.currencies[currency].symbol;
      }

      let countryNativeName = "";
      if (country.name.nativeName && country.name.nativeName.eng) {
        countryNativeName = country.name.nativeName.eng.common;
      }

      return {
        language,
        currency,
        currencySymbol,
        countryNativeName,
        flagUrl: country.flags.svg,
        flagAlt: country.flags.alt,
        countryName: country.name.common,
        region: country.region,
        independent: country.independent,
        area: country.area,
        cca3: country.cca3,
        subRegion: country.subregion ?? "",
        capitalName: country.capital ? country.capital[0] : "",
        timezones: country.timezones ?? [],
      };
    });
  }
}
