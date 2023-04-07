import styles from "../page.module.css";

export default function AnimationSection({ currentIndex, content }) {
  if (!content) {
    return null;
  }

  return (
    <div
      className={`${styles.animation} `}
      style={{
        transform: `translateX(-${(currentIndex * 100) / content.length}%)`,
        width: `calc(100vw * ${content.length})`,
      }}
    >
      {content.map((item, index) => (
        <div key={index}>
          <video
            autoplay="autoplay"
            loop
            muted
            style={{ width: `100vw` }}
            playsInline
          >
            <source src={item.animation} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
}
