import Options from "./Options";

function Question({ question, answer, dispatch, isBackward }) {
  return (
    <div>
      {isBackward ? (
        <div class="title-container">
          <button
            class="btn btn-ui"
            onClick={() => dispatch({ type: "finish" })}
          >
            Go back
          </button>
        </div>
      ) : null}
      <br />
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}

export default Question;
