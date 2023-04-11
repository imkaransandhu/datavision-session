import axios from "axios";

const FetchTvScreenGallery = (setBackgroundImages) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "/api/tvScreenGallery/route",
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      setBackgroundImages([...response.data]);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchTvScreenGallery;
