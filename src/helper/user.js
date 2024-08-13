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
  console.info(registerResponse.body);
  return registerResponse;
}
