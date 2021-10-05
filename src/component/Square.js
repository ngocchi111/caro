function Square({highlight, onClick, value}) {
  const className = 'square' + (highlight ? ' highlight' : '');
  return (
    <button
      className={className}
      onClick={onClick}>
      {value}
    </button>
  );
  }

  export default Square;