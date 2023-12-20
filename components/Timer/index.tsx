"use client";
import { useTimerStore } from "@/utils/store";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

interface Props {
  expiryTimestamp: any;
}
const Timer = ({ expiryTimestamp }: Props) => {
  const setIsRunning = useTimerStore((state) => state.setIsRunning);

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setIsRunning(false);
    },
  });
  return (
    <div className="text-center">
      <div className="text-4xl">
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <p className={isRunning ? "text-green-500 " : "text-red-500"}>
        {isRunning ? "Interview Started" : "Interview Finished"}
      </p>
    </div>
  );
};

export default Timer;
