function Options({ question, answer, dispatch }) {
  const hasAnswere = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswere
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswere}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
