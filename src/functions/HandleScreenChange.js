const handleScreenChange = (setCurrentScreen) => {
  console.log("chnage image Value");
  setCurrentScreen((prevCount) => (prevCount === 2 ? 0 : prevCount + 1));
};

export default handleScreenChange;
