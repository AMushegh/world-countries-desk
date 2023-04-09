import { singleton } from "tsyringe";
import { toast } from "react-toastify";

@singleton()
export class MessagesService {
  public showSuccessMessage(message: string) {
    toast.success(message);
  }

  public showErrorMessage(message: string) {
    toast.error(message);
  }
}
