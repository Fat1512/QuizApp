function FinishedScreen({ points, maxPoints, highestScore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints}{" "}
        {Math.ceil(percentage)}%;
      </p>
      <p className="highscore">Highest Score {highestScore}</p>

      <div class="flex-container">
        <button
          onClick={() => dispatch({ type: "restart" })}
          class="btn btn-ui"
        >
          Restart Quiz
        </button>
        <button onClick={() => dispatch({ type: "startBackward" })} class="btn">
          Show Selected Answers
        </button>
      </div>
    </>
  );
}

export default FinishedScreen;
