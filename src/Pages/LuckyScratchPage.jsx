import background from '../Images/background.png';
import boxes from '../Images/boxes.png';

export const LuckyScratchPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}
      className="w-full h-screen relative overflow-hidden"
    >

      <div className="flex justify-evenly w-screen absolute -bottom-5">
        <div
          style={{
            backgroundImage: `url(${boxes})`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
          className="w-1/4 h-28"
        />
        <div
          style={{
            backgroundImage: `url(${boxes})`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
          className="w-1/4 h-28"
        />
      </div>
    </div>
  )
}
