"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Delay } from "./Delay";
import { data } from "@/config/data";

const motionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    type: "tween",
    duration: 2,
  },
};

const Questions = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-700">
        Interview Questions
      </h1>
      <AnimatePresence>
        {data.questions.map((question: any, index: number) => (
          <Delay delay={index * 400} key={index}>
            <motion.div
              key={index}
              {...motionProps}
              className="flex justify-between w-full p-4 bg-white rounded-lg shadow-xl"
            >
              <p>{question.question}</p>
              <p className="text-sm text-emerald-600">{question.time}</p>
            </motion.div>
          </Delay>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Questions;
