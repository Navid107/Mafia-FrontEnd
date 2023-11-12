// SaulGoodmanAction.jsx
import React from 'react';
import SelectBox from '../CardUI/SelectBox';

const SaulGoodmanAction = ({ characterData, target, handleSubmission }) => {
  const saulGoodman = characterData.find((char) => char.name === 'Saul Goodman');

  if (!saulGoodman || saulGoodman.death) {
    // Saul Goodman is dead or not found
    return null;
  }

  return (
    <div>
      <h3>Saul Goodman Action</h3>
      <SelectBox
        characterData={characterData}
        target={target}
        handleSubmission={handleSubmission}
        character={saulGoodman}
      />
    </div>
  );
};

export default SaulGoodmanAction;
