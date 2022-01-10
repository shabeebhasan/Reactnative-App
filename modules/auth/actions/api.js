import axios from "axios";

const BASE_URL = "https://6b7c-39-34-156-112.ngrok.io"; // your app back-end url

const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

function apiLoginRequest(payload) {
  return authAPI.post(`/api/v1/login/`, payload);
}

function apiSignupRequest(payload) {
  return authAPI.post(`/api/v1/signup/`, payload);
}

function apiLogoutRequest(payload) {
  return authAPI.post(`/rest-auth/logout/`, null, {
    headers: { Authorization: `Token ${payload.token}` },
  });
}

function apiAuthUserRequest(payload) {
  return authAPI.get(`/rest-auth/user/`, null, {
    headers: { Authorization: `Token ${payload.token}` },
  });
}

function apiResetPasswordRequest(payload) {
  return authAPI.post(`/api/v1/password-reset/`, payload);
}

function verifyCodeRequest(payload) {
  return authAPI.post(`/api/v1/password-reset/validate_token/`, payload);
}

function apiSetPasswordRequest(payload) {
  console.log(payload)
  return authAPI.post(`/api/v1/password-reset/confirm/`, payload);
}

export const api = {
  apiLoginRequest,
  apiSignupRequest,
  apiLogoutRequest,
  apiResetPasswordRequest,
  apiAuthUserRequest,
  verifyCodeRequest,
  apiSetPasswordRequest,
};
