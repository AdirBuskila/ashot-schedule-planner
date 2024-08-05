import './App.css';
import React, { useState } from 'react';
import NameInput from './components/NameInput';
import AvailabilityForm from './components/AvailabilityForm';
import SchedulePlanner from './components/SchedulePlanner';

function App() {
  const [guards, setGuards] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [shiftCounts, setShiftCounts] = useState({});


  const handleNamesSubmit = (nameArray) => {
    setGuards(nameArray);
  };

  const handleAvailabilitySubmit = (avail) => {
    setAvailability(avail);
  };

  const handleAutoFill = () => {
    const teamNames = ['Adir', 'Ofir', 'Shahar', 'Itay', 'Gabriel', 'Ohad', 'Orel', 'Ron', 'Sam', 'Yael'];
    setGuards(teamNames);
  };

  const handleScheduleCompletion = (guardList) => {
    let shiftCountMap = {};
    guardList.forEach(guard => {
      shiftCountMap[guard.name] = guard.assignedShiftsCount;
    });
    setShiftCounts(shiftCountMap);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guard Schedule Planner</h1>
        {!guards.length && <button onClick={handleAutoFill}>Ashot Team</button>}
        {!guards.length ? (
          <NameInput onNamesSubmit={handleNamesSubmit} />
        ) : !availability ? (
          <AvailabilityForm guards={guards} onSubmit={handleAvailabilitySubmit} />
        ) : (
          <>
            <SchedulePlanner
              availability={availability}
              guards={guards}
              onComplete={handleScheduleCompletion}
            />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
