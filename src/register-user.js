import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 10,
  // A string specifying the total duration of the test run.
  duration: "30s",

  summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)", "p(99)"],
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function () {
  const uniqueId = new Date().getTime();

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
  http.post("http://127.0.0.1:8080/api/v1/users/register", JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
    
  });
  // sleep(1);
}
