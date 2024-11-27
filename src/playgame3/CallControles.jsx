import React from 'react';

const CallControls = ({ remotePeerIdValue, setRemotePeerIdValue, call, handleRandomCall }) => {
  return (
    <div className="call-controls">
      <input 
        type="text" 
        value={remotePeerIdValue} 
        onChange={(e) => setRemotePeerIdValue(e.target.value)} 
        placeholder="Enter remote peer ID"
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <button onClick={handleRandomCall}>Call Random 3 Members</button>
    </div>
  );
};

export default CallControls;
