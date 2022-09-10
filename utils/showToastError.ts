import axios from "axios";
import { toast } from "react-toastify";

export const showToastError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError: any = error.response;
    toast.error(axiosError.data.message);
  } else {
    toast.error(error);
  }
};
