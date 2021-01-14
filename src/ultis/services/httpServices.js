import axios from "axios";
import { startLoading, stopLoading } from "../../redux/loading/loading.actions";
import store from "../../redux/store";

axios.defaults.baseURL = "http://iuvo.arcocia.tech/api/";

const { dispatch } = store;

//let myToken =
//"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2MzNmE2ZmRlMGYzZjYyOTJhOWU2MzQxZjNkMzQ4NTlhYjgwN2U2MWNkMzRjNzRkNGMwMGRiYmM5NDhjZTE1NTc5MzUwNjMwMGNjODEyMzYiLCJpYXQiOiIxNjEwNTYwNzc2LjMxMTE3OSIsIm5iZiI6IjE2MTA1NjA3NzYuMzExMTgyIiwiZXhwIjoiMTY0MjA5Njc3Ni4zMDkzMjgiLCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.IKsvhOZDKNZmsHqiblhSZvHhGMPSfyVx5sIlIQSi3gUKnKGuHyfQ-lLbH1-aFKb-1RAy0ziYSsW-6MHSCYMVzs1K3E_CyNzeVeTq7OpoD0sznQYDtR1EI4Gi0fgNt0HZzunjCgTxjhxFe973Iwqno5Q1xLtTZyCCrpkoMljSCjYYOFellGHrOQPilsWqoAOGVFfM6Quz82MtIUqb8wPPCwjAAGiVdJdOtlX3HyNK4ynaFTWP5X5K4wOYu_J0HiIPZrwFZKT9OBj0hyS-sxZE6bFmLAwJRm9j7EMAQ0s7VPrRD_dLFwRo30EhzEyh_TU5es4-BRpBZEc7ytRTIy3Vj2IU767r5yrmQexJTxeiKeeH_VC51UEUYD_r3Mq5V3_TB4YgtO9_jMtcNSOUPXjys-y7BxVvlMPlXylgIIcorgzEtbkxDA2b1NrG5O3Y9TkivPH79N0MoM6562yyA_SZ3ym-YoQM3KQfvJKnCufzSM4VRIodvomc86f2QDR5vFUGRY1AjQBNCa8rR1XPyTIneHHENzdAg6aEYq1-Lr0gC4moIhNLpsOfKSldQv2UEptY62AxWVA66hDlfuCOLGsJbSmJ70UnXwdcN9-Io9FIumnHkeTIuvhwri_RHEshI6ihbQfHf5Gdo-0ZHGPllohvoTCuEgnM0XfMqzRAGGEVygk";

axios.interceptors.request.use(
  (request) => {
    dispatch(startLoading());

    const requestUrl = request?.url.split("/")[0];
    const isAuthUrl = [
      "login",
      "register",
      "forget-password",
      "password-reset",
    ].includes(requestUrl);

    if (!isAuthUrl) {
      
      request.headers.common["Authorization"] =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzc5NWIzYTAwMGQwMzY5MjExYmIzYjEyZGM5NTZhYzE1ODU4M2ZhNGFjMDNlMmM5YjJiYTJhZTJkNzk5Y2E3NjM1NDQzMmY3MjQxMzFiMTEiLCJpYXQiOiIxNjEwNjQ5NzYyLjcxMTYwMCIsIm5iZiI6IjE2MTA2NDk3NjIuNzExNjAzIiwiZXhwIjoiMTY0MjE4NTc2Mi43MDg3NjgiLCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.m6wT885EncSj9HVq9vpxNLeR--dLsbchaDFUkFSWpphWSccQ66ucfSKfWWI7dwvbovkSrUsuKeyyJG9l3c518YPxVpsjqXdoLQK4bBY4x_JWO2wF4irHxr_eK35KwjBnSC8tFKSUFS4LtVss_XXmdRMEHq62uhl-AgDRzNcfyb2iKq3q62KGX9j-8sJ0qnGfOipSEGEJwsJRj3Q_jv1C6ceJVvdRIWKARsffSapNrF6VVgSUxvxOIXh9v8kETgmVd83IgkkyijKyixcyi6PJbDPmrOT8vUFqXk7JEyUvxF_9MAuv3kD-Srks7K7Q5gX7-ydbIkMPJIEWEwyWxaALJQyXY0HJeuWBYZDeAblVb6XGE_imGlvsn8_n-BW53MZMvCiJdqMGCfgb3o9NeYyCceyCCPhR37F4d1kcM54zG1pM14Kp7FascD0BkHxtKG9hadBt3BmJAOmXZhBIxy9UOLFssL4PSha80OS0Nqnn8hgJfpPVF6or6DzslPSX19AoS95HpYw5oe8zDk_HhGCbcHzJlcWlcmtsc8XQyrGOfaiLVPeXA1Ls1TgdeE2QB3oXFi5EIswrsFiMjY5bAYxwCx_l5thEJVRi6fxYc4lc9m2gAyXdvYmFjw_M7gInqiqT7VoA9KZbii6Ebw-erkefD5PhDP4tJDvSTLFxLfJ4Mk0";
        //console.log("request headerce is ni is final is", request);
      }
    
    return request;
  },
  (error) => {
    dispatch(stopLoading());
  //  console.log("request error isb", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    dispatch(startLoading());
    return response;
  },
  (error) => {
    dispatch(stopLoading());
   // console.log("response error is", error?.response?.status);
    return Promise.reject(error);
  }
);

export default {
  post: axios.post,
  put: axios.put,
  get: axios.get,
  delete: axios.delete,
};
