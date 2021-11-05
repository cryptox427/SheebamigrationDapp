import background from '../Images/background.png';
import boxes from '../Images/boxes.png';
import logo from '../Images/logo.png';

export const LuckyScratchPage = () => {

  const items = [1, 2, 3, 4, 5, 6];

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}
      className="w-full h-auto xl:h-screen flex items-center relative overflow-hidden"
    >
      <div className="w-screen mt-10 mb-20 xl:my-0 flex flex-col xl:flex-row items-center justify-center gap-10 text-blue-900">
        <div className="w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12 xl:w-2/12">
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
        <div className="w-9/12 sm:w-7/12 md:w-9/12 lg:w-1/2">
          <div
            className="flex flex-col gap-10 justify-evenly w-full h:auto md:h-96 bg-orange border-4 border-yellow rounded-xl p-10"
          >
            <div
              style={{
                backgroundImage: `url(${logo})`,
                backgroundSize: "cover",
                backgroundPosition: "center center"
              }}
              className="mx-auto w-60 h-24"
            />
            <div className="flex flex-col md:flex-row items-center justify-center gap-20 w-full">
              <div className="rounded-full border-4 border-yellow bg-blue-300 flex-shrink-0 h-24 w-24 cursor-pointer" />
              <div className="rounded-full border-4 border-yellow bg-blue-300 flex-shrink-0 h-24 w-24 cursor-pointer" />
              <div className="rounded-full border-4 border-yellow bg-blue-300 flex-shrink-0 h-24 w-24 cursor-pointer" />
            </div>

          </div>
          <div className="flex flex-col items-center justify-center gap-2 mt-10 w-full">
            <button className="bg-orange py-2 px-5 text-yellow font-bold text-4xl rounded-2xl">BUY</button>
            <label className="border-b-2	border-blue-900">Rules & Gamble Aware</label>
          </div>
        </div>

        <div className="w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12 xl:w-2/12">
          <div>
            <div className="flex justify-center gap-1.5 font-bold text-blue-900 text-lg">
              <h1>TOTAL</h1>
              <div
                style={{
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center"
                }}
                className="h-5 w-5"
              />
              <h1>FACTORY paid</h1>
            </div>
            <div className="flex flex-col gap-5 border-4 border-yellow-700 rounded-xl p-5 bg-yellow" />
            <h1 className="font-bold text-blue-900 text-lg text-center mt-5">Scratch Card Sold</h1>
            <div className="flex flex-col gap-5 border-4 border-yellow-700 rounded-xl p-5 bg-yellow" />
            <h1 className="font-bold text-blue-900 text-lg text-center mt-5">Total Players</h1>
            <div className="flex flex-col gap-5 border-4 border-yellow-700 rounded-xl p-5 bg-yellow" />
            <div className="text-center text-sm mt-5">
              <p>
                Do not send funds to the contract address
                as they will be lost
                This is Defi, play at your own risk.
              </p>
            </div>
          </div>
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
