import execution from "k6/execution";
import { authMe, loginUser, registerUser } from "../helper/user.js";
import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
  scenarios: {
    userRegistration: {
      exec: "userRegistration",
      executor: "shared-iterations",
      vus: 10,
      iterations: 200,
      maxDuration: "2m",
    },
    userLogin: {
      exec: "userLogin",
      executor: "shared-iterations",
      vus: 10,
      iterations: 200,
      maxDuration: "2m",
    },
    authMeUser: {
      exec: "authMeUser",
      executor: "shared-iterations",
      vus: 10,
      iterations: 200,
      maxDuration: "2m",
    },
  },
};

export function userRegistration() {
  const uniqueId = randomString(8);

  const body = {
    name: "test",
    gender: "male",
    telp: "6282132549879",
    birthday: "2023-07-15",
    address: "testaddress",
    email: `${uniqueId}test@gmail.com`,
    password: "password",
    username: `${uniqueId}test`,
  };
  registerUser(body);
}

export function userLogin() {
  const uniqueId = (execution.vu.idInInstance % 9) + 1;
  const body = {
    username: `testing${uniqueId}`,
    password: "password",
  };
  loginUser(body);
}

export function authMeUser() {
  const uniqueId = (execution.vu.idInInstance % 9) + 1;
  const body = {
    username: `testing${uniqueId}`,
    password: "password",
  };

  const loginResponse = loginUser(body);
  console.info(loginResponse);
  const token = loginResponse.json().data.token;
  authMe(token);
}
