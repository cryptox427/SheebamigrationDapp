import price1 from "../../Images/prize 1.png";
import price2 from "../../Images/prize 2.png";
import price3 from "../../Images/prize 3.png";
import price4 from "../../Images/prize 4.png";
import price5 from "../../Images/prize 5.png";
import price6 from "../../Images/prize 6.png";
import './RulesGambleAware.css';

const items = [
  {
    image: price1,
    value: 100
  },
  {
    image: price2,
    value: 30
  },
  {
    image: price3,
    value: 10
  },
  {
    image: price4,
    value: 5
  },
  {
    image: price5,
    value: 3
  },
  {
    image: price6,
    value: 1
  },
];
export const RulesGambleAware = ({ isOpen, close }) => {
  return (
    <div className={`${isOpen ? "flex" : "hidden"} flex justify-center items-center text-yellow fixed left-0 top-0 w-screen h-screen bg-black z-50`}>
      <div
        className="absolute right-5 top-5 border-2 border-yellow w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
        onClick={close}
      >
        <label className="text-2xl font-bold">X</label>
      </div>
      <div className="flex flex-col gap-10 items-center">
        <h1 className="text-gradient font-bold text-2xl sm:text-5xl">Rules & Gamble Aware</h1>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="text-center w-72 h-92">
            <h1 className="mb-3">How to Play</h1>
            <div className="rounded-xl border-2 border-red-600 p-5 bg-yellow text-black flex flex-col gap-2">
              <p>Connect your wallet</p>
              <p>Approve FACTORY</p>
              <p>Click buy and confirm</p>
              <p>Wait for TX to finish</p>
              <p>Click the circles to see if you win!</p>
            </div>
            <div className="font-bold text-xs mt-2.5">
              <p>Please play responsibly, and only play for fun.</p>
              <p>For help with gambling addiction</p>
              <a
                className="text-blue-500 font-bold text-xl"
                href="https://www.google.com/search?q=gambling+addiction+services+near+me&rlz=1C1CHBF_enIE958IE958&oq=gambling+addiction+services+near+me&aqs=chrome..69i57j0i22i30i457j0i402j0i22i30l2j0i390.9764j1j9&sourceid=chrome&ie=UTF-8"
                target="_blank"
                rel="noreferrer"
              >
                CLICK HERE
              </a>
              <p>to search for services in your area</p>
            </div>
          </div>
          <div className="flex flex-col text-center w-72 h-92">
            <h1 className="mb-3">Scratchies Odds</h1>
            <div className="rounded-xl border-2 border-red-600 py-5 px-10 bg-yellow text-black flex flex-col justify-between flex-1">
              {
                items.map(({ image, value }) => (
                  <div
                    key={value}
                    className="flex justify-between"
                  >
                    <div className="flex gap-2">
                      <img src={image} alt="icon" className="max-w-full h-5 w-5 " />
                      <img src={image} alt="icon" className="max-w-full h-5 w-5 " />
                      <img src={image} alt="icon" className="max-w-full h-5 w-5 " />
                    </div>
                    <h1>{value}/500</h1>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
