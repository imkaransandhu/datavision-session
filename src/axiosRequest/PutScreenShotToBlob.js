import axios from "axios";

const PutScreenShotToBlob = (imgSrc, socket) => {
  function isDataURI(str) {
    return /^data:[^;]+(;[^,]+)*(,.*|$)/.test(str);
  }

  // Validating if the imgSrc is a valid DataURI
  if (isDataURI(imgSrc)) {
    //  Creating the name of file with a time and date stamp
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0"); // getMonth() returns 0-indexed month, so add 1
    const currentDay = currentDate.getDate().toString().padStart(2, "0");
    const currentHour = currentDate.getHours().toString().padStart(2, "0");
    const currentMinute = currentDate.getMinutes().toString().padStart(2, "0");
    const currentSecond = currentDate.getSeconds().toString().padStart(2, "0");
    const fileName = `image_${currentMonth}.${currentDay}.${currentYear}_${currentHour}:${currentMinute}:${currentSecond}`;

    // Data Object sent to the backend
    let data = {
      imgData: imgSrc,
      name: fileName,
    };

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "/api/PutBlob",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        socket.emit("uploaded-blob", fileName);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export default PutScreenShotToBlob;
