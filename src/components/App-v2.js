import { useReducer, useEffect, useState } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";

import Progress from "./Progress";
import Footer from "./Footer";
import Timer from "./Timer";
import FinishedScreen from "./FinishedScreen";

const initialState = {
  questions: [],
  filteredQuestions: [],
  numQuestions: 0,
  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  points: 0,
  highestScore: 0,
  secondsRemaining: null,
  isBackward: false,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "errorReceived":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "startBackward":
      return {
        ...state,
        status: "active",
        isBackward: true,
        index: 0,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions.map((el) => {
          el.isAnswered = false;
          return el;
        }),
        status: "ready",
        isBackward: false,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highestScore:
          state.highestScore < state.points ? state.points : state.highestScore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "difficulty":
      const filteredQuestions = state.questions.filter(
        (question) => question.points === +action.payload
      );
      return {
        ...state,
        filteredQuestions: filteredQuestions,
        numQuestions: filteredQuestions.length,
      };
    case "numQuestion":
      return { ...state, numQuestions: action.payload };
    case "newAnswer":
      const question = state.filteredQuestions[state.index];
      const isCorrect = action.payload === question.correctOption;

      return {
        ...state,
        points: isCorrect ? state.points + question.points : state.points,
        filteredQuestions: state.filteredQuestions.map((el) => {
          if (el === question) el.isAnswered = true;

          return el;
        }),
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1 };
    case "previousQuestion":
      return { ...state, index: state.index - 1 };

    default:
      throw new Error("Unknown");
  }
}
// centralize render logic, abstract internal details
export default function App() {
  const [
    {
      status,
      index,
      points,
      highestScore,
      secondsRemaining,
      filteredQuestions,
      numQuestions,
      isBackward,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // const numQuestions = 4;

  const maxPoints = filteredQuestions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch {
        dispatch({ type: "errorReceived" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" ? <Loader /> : null}
        {status === "error" ? <Error /> : null}
        {status === "ready" ? (
          <StartScreen
            maxQuestions={filteredQuestions.length}
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        ) : null}
        {status === "active" ? (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              isAnswered={filteredQuestions[index].isAnswered}
            />
            <Question
              isBackward={isBackward}
              question={filteredQuestions[index]}
              dispatch={dispatch}
            />

            <Footer>
              {index > 0 && <PreviousButton dispatch={dispatch} />}
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              ></Timer>
              {filteredQuestions[index].isAnswered ? (
                <NextButton
                  index={index}
                  numQuestions={numQuestions}
                  dispatch={dispatch}
                />
              ) : null}
            </Footer>
          </>
        ) : null}
        {status === "finished" ? (
          <FinishedScreen
            points={points}
            maxPoints={maxPoints}
            highestScore={highestScore}
            dispatch={dispatch}
          />
        ) : null}
      </Main>
    </div>
  );
}
