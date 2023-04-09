export interface ICountryNativeName {
  official: string;
  common: string;
}

export interface ICountryName {
  common: string;
  official: string;
  nativeName: Record<string, ICountryNativeName>;
}

export interface ICountryCurrencyDetails {
  name: string;
  symbol: string;
}

export type ICountryCurrency = Record<string, ICountryCurrencyDetails>;

interface ICountryTranslationsDetails {
  official: string;
  common: string;
}

export type ICountryTranslations = Record<string, ICountryTranslationsDetails>;

export interface ICountryDetails {
  name: ICountryName;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: ICountryCurrency;
  idd: { root: string; suffixes: string[] };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Record<string, string>;
  translations: ICountryTranslations;
  latlng: [number, number];
  landlocked: boolean;
  area: number;
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  fifa: string;
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
}

export type CountriesResponse = Partial<ICountryDetails[]>;

export interface ICountry {
  flagUrl: string;
  flagAlt: string;
  countryName: string;
  countryNativeName: string;
  capitalName: string;
  region: string;
  subRegion: string;
  language: string;
  currency: string;
  currencySymbol: string;
  independent: boolean;
  area: number;
  cca3: string;
  timezones: string[];
}
