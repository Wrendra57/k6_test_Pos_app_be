import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import { registerUser } from "./helper/user.js";
import { sleep } from "k6";

export const options = {
  vus: 10,
  duration: "30s",

  summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)", "p(99)"],
};

export default function () {
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
