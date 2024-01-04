export const data = {
  questions: [
    { question: "Who are you?", time: "2 min" },
    { question: "What is your strength?", time: "3 min" },
    { question: "Where are you from?", time: "5 min" },
    { question: "Which framework do you specilize in?", time: "7 min" },
    { question: "What makes you fit for this position?", time: "10 min" },
  ],

  multistepQuestions: [
    {
      stage: "Introduction",
      questions: [
        { question: "Who are you?", time: "1 min" },
        {
          question: "Briefly discuss about your educational qualification",
          time: "2 min",
        },
        {
          question: "What are your greatest strengths to a company?",
          time: "2 min",
        },
        {
          question: "What makes you fit for this position?",
          time: "3 min",
        },
        {
          question:
            "Do you have any previous experiences? If so briefly explain it.",
          time: "5 min",
        },
        {
          question: "Reveal something about yourself not on your resume",
          time: "3 min",
        },
        {
          question: "Reveal something about yourself not on your resume",
          time: "3 min",
        },
      ],
    },
    {
      stage: "Coding",
      questions: [
        {
          question: "What is the significance of keys in React?",
          time: "2 min",
        },
        {
          question:
            "How would you create Higher Order Components (HOCs) in React?",
          time: "3 min",
        },
        {
          question:
            "Explain the Virtual DOM, and a pragmatic overview of how React renders it to the DOM.",
          time: "3 min",
        },
        {
          question:
            "What are the most common approaches for styling a React application?",
          time: "5 min",
        },
        {
          question:
            "Why do class methods need to be bound to a class instance, and how can you avoid the need for binding?",
          time: "5 min",
        },
        {
          question: "What is the significance of refs in React?",
          time: "2 min",
        },
      ],
    },
    {
      stage: "Conclusion",
      questions: [
        {
          question: "Where do you see yourself in the next 5 years?",
          time: "2 min",
        },
        {
          question: "Describe your ideal workspace",
          time: "5 min",
        },
        {
          question: "Outline the process on how you set goals",
          time: "3 min",
        },
        {
          question: "How do you deal with tight deadlines?",
          time: "5 min",
        },
        {
          question: "What motivates you to work?",
          time: "5 min",
        },
      ],
    },
  ],
};
