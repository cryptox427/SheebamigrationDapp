export const BoxInfo = ({
  imageSource = '',
  title = '',
  content = '',
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url("${imageSource}")`,
      }}
    >
      <h1 className="text-3xl">{title}</h1>
      <h2>{content}</h2>
    </div>
  );
};
