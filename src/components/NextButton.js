import { type } from "@testing-library/user-event/dist/type";

function NextButton({ dispatch, index, numQuestions }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({
          type: index === numQuestions - 1 ? "finish" : "nextQuestion",
        })
      }
    >
      Next
    </button>
  );
}

export default NextButton;
