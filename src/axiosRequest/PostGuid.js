import axios from "axios";

export default function PostGuid(guid) {
  // Update the Guid.json file with the latest GUID value
  let data = JSON.stringify({
    guid: guid,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "/api/PutBlobGuid",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}
