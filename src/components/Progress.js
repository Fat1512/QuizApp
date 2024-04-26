function Progress({ index, numQuestions, points, maxPoints, isAnswered }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + (isAnswered == null ? 0 : 1)}
      />
      <p>
        Question<strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>
          {points} / {maxPoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
