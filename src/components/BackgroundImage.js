export const BackgroundImage = ({ url = "", className = "", children }) => {
  return (
    <div
      className={`${className} bg-center bg-cover bg-no-repeat`}
      style={{
        backgroundImage: `url("${url}")`,
      }}
    >
      {children}
    </div>
  );
};
