function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome Welcome</h2>
      <h3>{numQuestions} questions to test you React knowledege</h3>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
