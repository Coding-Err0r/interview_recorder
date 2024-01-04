"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Delay } from "./Delay";
import { data } from "@/config/data";
import useMultistepForm from "@/hooks/useMultistepForm";

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
  const { steps, currentStepIndex, step, next, goTo, isLastStep } =
    useMultistepForm([]);
  return (
    <div className="relative flex flex-col gap-4 p-4">
      <h1 className="relative text-3xl font-bold text-center text-gray-700">
        Interview Questions
      </h1>
      <p className="absolute pb-6 text-xl right-6 top-12">
        Step {currentStepIndex + 1}/{steps.length}
      </p>
      <div className="relative flex flex-col gap-4 mt-6">
        {step}
        <AnimatePresence>
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
        </AnimatePresence>
      </div>
      <button
        className="p-4 text-xl font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
        onClick={next}
      >
        {isLastStep ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default Questions;
