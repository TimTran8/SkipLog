import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

import UseTimer from '../hooks/UseTimer';
import { formatTime } from '../utils/formatTime';

const element = <FontAwesomeIcon icon={faClock} />

const Timer = () => {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = UseTimer(0)

  return (
    <div className="app">
      <h3>React Stopwatch {element}</h3>
      <div className='stopwatch-card'>
        <h1>{formatTime(timer)}</h1>
        <div className='buttons'>
          {
            !isActive && !isPaused ?
              <button onClick={handleStart}>Start</button>
              : (
                isPaused ? <button onClick={handlePause}>Pause</button> :
                  <button onClick={handleResume}>Resume</button>
              )
          }
          {
            !isActive && !isPaused ?
              <button onClick={handleReset} disabled={!isActive}>Reset</button> 
              : (isPaused ? <button>Log</button> : <button onClick={handleReset} disabled={!isActive}>Reset</button> )
          }
        </div>
      </div>
    </div>
  );
}

export default Timer;
