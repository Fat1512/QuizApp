function NextButton({ dispatch }) {
  return (
    <button
      className="btn btn-ui previous-btn"
      onClick={() =>
        dispatch({
          type: "previousQuestion",
        })
      }
    >
      Previous
    </button>
  );
}

export default NextButton;
