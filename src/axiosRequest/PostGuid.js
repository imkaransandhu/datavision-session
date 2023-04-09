import axios from "axios";

export default function PostGuid(guid) {
  // Update the Guid.json file with the latest GUID value
  let data = {
    guid: guid,
  };

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "/api/PostGuid",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(`uploaded Successfully ${response.data.guid}`);
    })
    .catch((error) => {
      console.log(error);
    });
}
