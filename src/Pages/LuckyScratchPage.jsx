import background from '../Images/background.png';
import boxes from '../Images/boxes.png';
import GameIMage from '../Images/lucky-scratch.jpeg';

export const LuckyScratchPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}
      className="w-full h-screen flex items-center relative overflow-hidden"
    >
      <div className="w-screen ">
        <div>

        </div>
        <div
          style={{
            backgroundImage: `url(${GameIMage})`,
            backgroundSize: "auto 100%",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
          className="h-72"
        />
        <div>

        </div>
      </div>

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
