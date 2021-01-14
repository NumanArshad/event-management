import axios from "axios";

axios.defaults.baseURL = "http://iuvo.arcocia.tech/api/";

const myToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2MzNmE2ZmRlMGYzZjYyOTJhOWU2MzQxZjNkMzQ4NTlhYjgwN2U2MWNkMzRjNzRkNGMwMGRiYmM5NDhjZTE1NTc5MzUwNjMwMGNjODEyMzYiLCJpYXQiOiIxNjEwNTYwNzc2LjMxMTE3OSIsIm5iZiI6IjE2MTA1NjA3NzYuMzExMTgyIiwiZXhwIjoiMTY0MjA5Njc3Ni4zMDkzMjgiLCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.IKsvhOZDKNZmsHqiblhSZvHhGMPSfyVx5sIlIQSi3gUKnKGuHyfQ-lLbH1-aFKb-1RAy0ziYSsW-6MHSCYMVzs1K3E_CyNzeVeTq7OpoD0sznQYDtR1EI4Gi0fgNt0HZzunjCgTxjhxFe973Iwqno5Q1xLtTZyCCrpkoMljSCjYYOFellGHrOQPilsWqoAOGVFfM6Quz82MtIUqb8wPPCwjAAGiVdJdOtlX3HyNK4ynaFTWP5X5K4wOYu_J0HiIPZrwFZKT9OBj0hyS-sxZE6bFmLAwJRm9j7EMAQ0s7VPrRD_dLFwRo30EhzEyh_TU5es4-BRpBZEc7ytRTIy3Vj2IU767r5yrmQexJTxeiKeeH_VC51UEUYD_r3Mq5V3_TB4YgtO9_jMtcNSOUPXjys-y7BxVvlMPlXylgIIcorgzEtbkxDA2b1NrG5O3Y9TkivPH79N0MoM6562yyA_SZ3ym-YoQM3KQfvJKnCufzSM4VRIodvomc86f2QDR5vFUGRY1AjQBNCa8rR1XPyTIneHHENzdAg6aEYq1-Lr0gC4moIhNLpsOfKSldQv2UEptY62AxWVA66hDlfuCOLGsJbSmJ70UnXwdcN9-Io9FIumnHkeTIuvhwri_RHEshI6ihbQfHf5Gdo-0ZHGPllohvoTCuEgnM0XfMqzRAGGEVygk";

axios.interceptors.request.use(
  (request) => {
    const requestUrl = request?.url.split("/")[0];
    const isAuthUrl = [
      "login",
      "register",
      "forget-password",
      "password-reset",
    ].includes(requestUrl);

    if (!isAuthUrl) {
      request.headers["Bearer Token"] = myToken;
    }
    console.log("reuest check is is", isAuthUrl, request?.url.split("/")[1]);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  post: axios.post,
  put: axios.put,
  get: axios.get,
  delete: axios.delete,
};
