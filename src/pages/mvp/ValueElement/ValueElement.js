import styles from "./ValueElement.module.css";

const ValueElement = ({ text }) => {
  function getValueTextFromImageUrl(imageUrl) {
    const altText = /\/([^/]+)\.[a-z]{3,4}$/i
      .exec(imageUrl)[1]
      .replace(/%20/g, " ");
    return altText;
  }

  if (!text) {
    return null;
  }

  const valueText = getValueTextFromImageUrl(text.url);
  return (
    <div className={styles.valueElement}>
      <h1>{valueText}</h1>
    </div>
  );
};

export default ValueElement;
