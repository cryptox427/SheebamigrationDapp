import WoodBox from "../Images/Asset 104.png";
import { BoxInfo } from "./BoxInfo";

export const WoodBoxes = ({ boxesState = [] }) => {
  return (
    <div className="container xl:absolute xl:-bottom-20 px-20 py-2.5 my-5 mx-auto flex flex-wrap justify-center gap-10">
      {boxesState.map(({ title, value, toFixed }) => (
        <BoxInfo
          key={title}
          imageSource={WoodBox}
          title={title}
          content={Number(value).toFixed(toFixed)}
          className="flex flex-col items-center justify-center text-shadow bg-cover bg-center bg-no-repeat h-24 w-72 text-white text-2xl rounded-xl"
        />
      ))}
    </div>
  );
};
