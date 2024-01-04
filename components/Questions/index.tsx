"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Delay } from "./Delay";
import { data } from "@/config/data";
import useMultistepForm from "@/hooks/useMultistepForm";
import { useEffect, useState } from "react";

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
  const [step, setStep] = useState(0);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setStep(data.multistepQuestions.length);
  }, []);

  return (
    <div className="relative flex flex-col gap-4 p-4">
      <h1 className="relative text-3xl font-bold text-center text-gray-700">
        Interview Questions
      </h1>
      <p className="absolute pb-6 text-xl right-6 top-12">
        Step {index + 1}/{step}
      </p>
      <div className="relative flex flex-col gap-4 mt-6">
        {/* <AnimatePresence>
          {data.questions.map((question: any, index: number) => (
            <Delay delay={index * 400} key={index}>
              <motion.div
                key={index}
                {...motionProps}
                className="flex justify-between w-full p-4 bg-white rounded-lg shadow-xl "
              >
                <p>{question.question}</p>
                <p className="text-sm text-emerald-600">{question.time}</p>
              </motion.div>
            </Delay>
          ))}
        </AnimatePresence> */}
        <AnimatePresence>
          {data.multistepQuestions[index].questions.map(
            (question: any, index: number) => (
              <Delay delay={index * 400} key={index}>
                <motion.div
                  key={index}
                  {...motionProps}
                  className="flex justify-between w-full p-4 bg-white rounded-lg shadow-xl"
                >
                  <p>{question.question}</p>
                  <p className="text-sm text-center w-14 text-emerald-600">
                    {question.time}
                  </p>
                </motion.div>
              </Delay>
            )
          )}
        </AnimatePresence>
      </div>
      <button
        className={`p-4 text-xl font-bold text-white bg-blue-500 rounded-lg  ${
          step === index + 1
            ? "bg-green-500 hover:bg-green-700"
            : "bg-blue-500 hover:bg-blue-700"
        }`}
        onClick={() => setIndex(index + 1)}
      >
        {step === index + 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default Questions;
