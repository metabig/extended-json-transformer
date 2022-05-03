// import { data } from "./data.js";
import { LocationsMap } from "./map.js";
import { jsonTransform } from "./jsonTransform.js";
// console.dir(jsonTransform(data, LocationsMap), { depth: null });
import fetch, { FormData, File } from "node-fetch";
import HttpProxyAgent from 'http-proxy-agent';


const sendLocationsData = async (token) => {
  const locationsData = await fetch(
    "http://localhost:8080/api/organisationUnits.json?paging=false&fields=*",
    {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + Buffer.from("admin:district").toString("base64"),
      },
    }
  )
    .then((res) => res.json())
    .then((json) => [jsonTransform(json.organisationUnits[0], LocationsMap)])
    .catch(console.error);

  console.log(locationsData);
  const formData = new FormData();
  const file = new File([locationsData], "orgunits.json", {
    type: "application/json",
  });
  formData.append("file", file);
  const response = await fetch("http://localhost:8000/api/locations/import", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: token,
    },
    agent: new HttpProxyAgent('localhost:8080')
  }).then((r) => r.json());
  console.log(response);
};

fetch("http://localhost:8000/api/users/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "test@test.com",
    password: "adminadminadmin",
  }),
})
  .then((res) => res.json())
  .then((json) => json.id)
  .then(sendLocationsData);
