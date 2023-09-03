import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import CarComponent from "./CarComponent";
import Image from "next/image";

const CarRoad = ({}) => {
  const dispatch = useDispatch();
  const [myData, setMyData] = useState({ carPosition: 0 });
  const [otherPlayersData, setOtherPlayersData] = useState([]);

  const romPlData = useSelector((state) => state.roomConnectedPlayersData);
  const gameData = useSelector((state) => state.gameData);
  const socketSharedData = useSelector((state) => state.socketSharedData);
  const { arrayOfwrittenWords, orginalString } = gameData;
  const { userName, car } = socketSharedData;

  // const { romPlData, gameData, userName, car } = memoData;

  useEffect(() => {
    const writtenTextPercent =
      (arrayOfwrittenWords?.length * 100) / orginalString?.split(" ").length;

    if (writtenTextPercent > 0) {
      dispatch(addUserShareData({ carPosition: writtenTextPercent / 100 }));
    }
  }, [orginalString, dispatch, arrayOfwrittenWords]);

  useEffect(() => {
    const romPlayersDataArray = [];
    Object.keys(romPlData).forEach((item) => {
      if (romPlData[item].userName === userName) {
        setMyData(romPlData[item]);
        return;
      } else {
        romPlayersDataArray.push(romPlData[item]);
      }
    });
    setOtherPlayersData(romPlayersDataArray);
  }, [romPlData, userName]);

  return (
    <div
      style={{
        height: (otherPlayersData?.length + 1) * 70 + "px",
      }}
      className=" flex justify-around gap-14 pb-1  flex-col bg-slate-800   border-[5px]"
    >
      <div className="h-4  w-full mt-10 pl-[100px]  bg-slate-300  transform -translate-y-1/2">
        <div
          style={{
            marginLeft: `calc(${myData.carPosition * 100}% - 70px)`,
          }}
          className=" w-12  transition-all duration-300 ease-in-out"
        >
          <div className="mt-[-2rem]">
            <Image width={50} height={40} src={`/${2}.png`} alt="asdfasdf" />
          </div>
        </div>
      </div>

      {otherPlayersData?.map((item) => {
        return <CarComponent key={item.userName} userData={item} />;
      })}
    </div>
  );
};

export default CarRoad;
