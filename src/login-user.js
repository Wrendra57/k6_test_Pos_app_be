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

  const body = {
    password: "password",
    username: `superadmin`,
  };
  http.post("http://127.0.0.1:8080/api/v1/users/login", JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
    
  });
  // sleep(1);
}
