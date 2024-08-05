import './App.css';
import React, { useState } from 'react';
import NameInput from './components/NameInput';
import AvailabilityForm from './components/AvailabilityForm';
import SchedulePlanner from './components/SchedulePlanner';
// import ShiftCount from './components/ShiftCount';
import AlertMessages from './components/AlertMessages';

function App() {
  const [guards, setGuards] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [shiftCounts, setShiftCounts] = useState({});
  const [alertMessages, setAlertMessages] = useState([]);

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

  const handleScheduleCompletion = (guardList, messages) => {
    let shiftCountMap = {};
    guardList.forEach(guard => {
      shiftCountMap[guard.getName()] = guard.getAssignedShiftsCount();
    });
    setShiftCounts(shiftCountMap);
    setAlertMessages(messages);
  };

  const resetApp = () => {
    setGuards([]);
    setAvailability(null);
    setShiftCounts({});
    setAlertMessages([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guard Schedule Planner</h1>
        {!guards.length && (
          <div>
            <p className="App-subtitle">Save time and headache with automated scheduling!</p>
            <button className="auto-fill-button" onClick={handleAutoFill}>Ashot Team</button>
          </div>
        )}
      </header>
      <main>
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
            {/* <ShiftCount guards={guards} shiftCounts={shiftCounts} /> */}
            {alertMessages.length ? (<AlertMessages messages={alertMessages} />) : (<></>)}
            <button className="reset-button" onClick={resetApp}>Reset</button>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
