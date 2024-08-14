import { check } from "k6";
import http from "k6/http";
export function registerUser(body) {
  const registerResponse = http.post(
    "http://127.0.0.1:8080/api/v1/users/register",
    JSON.stringify(body),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  check(registerResponse, {
    "register response status must 200": (response) => response.status === 200,
    "register response data must not null": (response) =>
      response.json().data != null,
  });
  return registerResponse;
}

export function loginUser(body) {
  const loginResponse = http.post(
    "http://127.0.0.1:8080/api/v1/users/login",
    JSON.stringify(body),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  check(loginResponse, {
    "login response status must 200": (response) => response.status === 200,
    "login response data must not null": (response) =>
      response.json().data != null,
  });
  return loginResponse;
}

export function authMe(token) {
  const authMeResponse = http.get("http://127.0.0.1:8080/api/v1/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  check(authMeResponse, {
    "auth me response status must 200": (response) => response.status === 200,
    "auth me response data must not null": (response) =>
      response.json().data != null,
  });
  return authMeResponse;
}
