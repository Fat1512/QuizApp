function FinishedScreen({ points, maxPoints, highestScore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints}{" "}
        {Math.ceil(percentage)}%;
      </p>
      <p className="highscore">Highest Score {highestScore}</p>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
