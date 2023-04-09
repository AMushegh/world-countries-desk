import autobind from "autobind-decorator";
import { singleton, injectable } from "tsyringe";

import { ApiService } from "../../../services/api";
import { ICountryDetails } from "../types";

@injectable()
@singleton()
@autobind
export class CountriesApiService {
  constructor(private apiService: ApiService) {}

  public getCountries() {
    return this.apiService.makeRequest.get<ICountryDetails[]>("/all");
  }
}
