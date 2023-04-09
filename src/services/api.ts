import axios, { AxiosError, AxiosInstance } from "axios";
import { singleton } from "tsyringe";

import { MessagesService } from "./messages";

@singleton()
export class ApiService {
  public makeRequest: AxiosInstance;

  constructor(private messagesService: MessagesService) {
    this.makeRequest = axios.create({
      baseURL: "https://restcountries.com/v3.1",
    });

    this.makeRequest.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        this.messagesService.showErrorMessage(error.message);
      }
    );
  }
}
