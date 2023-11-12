// MafiaShotAction.jsx
import React from 'react';
import SelectBox from '../CardUI/SelectBox';

const MafiaShotAction = ({ characterData, target, handleSubmission }) => {
  const mafiaShot = characterData.find((char) => char.name === 'MafiaShot');

  if (!mafiaShot || mafiaShot.death) {
    // MafiaShot is dead or not found
    return null;
  }

  return (
    <div>
      <h3>Mafia Shot Action</h3>
      <SelectBox
        characterData={characterData}
        target={target}
        handleSubmission={handleSubmission}
        character={mafiaShot}
      />
    </div>
  );
};

export default MafiaShotAction;
