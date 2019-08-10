import React, { memo, useState, useCallback, useContext } from 'react';

import { TableContext, START_GAME } from './MineSearch';

const Form = memo(() => {
  const { dispatch } = useContext(TableContext);

  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);

  const handleRowChange = useCallback(e => {
    setRow(e.target.value);
  }, []);
  const handleCellChange = useCallback(e => {
    setCell(e.target.value);
  }, []);
  const handleMineChange = useCallback(e => {
    setMine(e.target.value);
  }, []);

  const handleButtonClick = useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine });
  }, [row, cell, mine]);

  return (
    <div>
      <input type='number' placeholder='가로' value={row} onChange={handleRowChange} />
      <input type='number' placeholder='세로' value={cell} onChange={handleCellChange} />
      <input type='number' placeholder='지뢰' value={mine} onChange={handleMineChange} />
      <button onClick={handleButtonClick}>시작</button>
    </div>
  );
});

export default Form;
