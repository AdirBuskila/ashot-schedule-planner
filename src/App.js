import './App.css';
import React, { useState } from 'react';
import { content } from './i8';
import NameInput from './components/NameInput';
import AvailabilityForm from './components/AvailabilityForm';
import SchedulePlanner from './components/SchedulePlanner';
// import ShiftCount from './components/ShiftCount';
import AlertMessages from './components/AlertMessages';
import Logo from './components/Logo';
import FlagToggleButton from './components/FlagToggleButton';

function App() {
  const [guards, setGuards] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [shiftCounts, setShiftCounts] = useState({});
  const [alertMessages, setAlertMessages] = useState([]);
  const [language, setLanguage] = useState('EN');

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

  const changeLanguage = () => {
    setLanguage((language == "EN") ? "HE" : "EN");
  }
  const pageDirection = () => {
    return (language == "EN") ? "ltr" : "rtl";
  }


  return (
    <div style={{ direction: (language == "EN") ? "ltr" : "rtl" }} className="App">
      <header className="App-header">
        <FlagToggleButton changeLanguage={changeLanguage} />
        <h1 onClick={resetApp}>{content[language].title}</h1>
        {!guards.length && (
          <div>
            <h2 className="App-subtitle">{content[language].subtitle}</h2>
            <Logo />
            <button className="auto-fill-button" onClick={handleAutoFill}>{content[language].autoFillButton}</button>
          </div>
        )}
      </header>
      <main>
        {!guards.length ? (
          <NameInput onNamesSubmit={handleNamesSubmit} i8={language} />
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
