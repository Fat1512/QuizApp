function StartScreen({ dispatch, numQuestions, maxQuestions }) {
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "start" });
  }

  return (
    <div className="start">
      <h2>Welcome Welcome</h2>
      <form onSubmit={handleSubmit} className="form-start">
        <select
          onChange={(e) =>
            dispatch({ type: "difficulty", payload: +e.target.value })
          }
          className="btn"
          required
        >
          <option value="" hidden selected>
            Selected difficulty
          </option>
          <option value={10}>Easy</option>
          <option value={20}>Medium</option>
          <option value={30}>Hard</option>
        </select>
        <br />
        {maxQuestions !== 0 ? (
          <>
            <input
              onChange={(e) =>
                dispatch({ type: "numQuestion", payload: +e.target.value })
              }
              type="range"
              value={numQuestions}
              max={maxQuestions}
              min={1}
            />
            <br />
            <h4>Question {numQuestions}</h4>
          </>
        ) : null}
        <br />
        <button className="btn btn-ui">Let's start</button>
      </form>
    </div>
  );
}

export default StartScreen;
