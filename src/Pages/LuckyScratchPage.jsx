import background from '../Images/background.png';
import boxes from '../Images/boxes.png';
import GameIMage from '../Images/lucky-scratch.jpeg';

export const LuckyScratchPage = () => {

  const items = [1, 2, 3, 4, 5, 6];

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}
      className="w-full h-screen flex items-center relative overflow-hidden"
    >
      <div className="w-screen flex items-center justify-center gap-10 text-blue-900">
        <div className="w-2/12">
          <h1 className="font-bold text-blue-900 text-center text-xl">Price Chart</h1>
          <div className="flex flex-col gap-5 border-4 border-yellow-700 rounded-xl p-5 bg-yellow">
            {
              items.map(item => (
                <div
                  key={item}
                  className="flex justify-between"
                >
                  <div className="flex gap-2">
                    <div
                      style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center"
                      }}
                      className="h-5 w-5"
                    />
                    <div
                      style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center"
                      }}
                      className="h-5 w-5"
                    />
                    <div
                      style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center"
                      }}
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex gap-5">
                    <label>400,000</label>
                    <div
                      style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center"
                      }}
                      className="h-5 w-5"
                    />
                  </div>
                </div>
              ))
            }
            <div className="flex flex-col gap-2 self-center">
              <div className="flex gap-5 self-center items-center">
                <h1 className="text-2xl font-bold">1,000</h1>
                <div
                  style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                  }}
                  className="h-10 w-10"
                />
              </div>
              <p className="font-bold self-center text-xs">per Scratch Card</p>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${GameIMage})`,
            backgroundSize: "auto 100%",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
          className="w-1/2 h-96 rounded"
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
    </div >
  )
}
