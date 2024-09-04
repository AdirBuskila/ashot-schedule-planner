import './styles/base.css';
import './styles/app.css';
import './styles/table.css';
import './styles/alerts.css';
import './styles/forms-buttons.css';
import './styles/form.css';
import React, { useState } from 'react';
import { content } from './i8';
import NameInput from './components/NameInput';
import AvailabilityForm from './components/AvailabilityForm';
import SchedulePlanner from './components/SchedulePlanner';
import AlertMessages from './components/AlertMessages';
import Logo from './components/Logo';
import FlagToggleButton from './components/FlagToggleButton';
import ShiftCount from './components/ShiftCount';
import { week } from './constants';

function App() {
  const [guards, setGuards] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [shiftCounts, setShiftCounts] = useState({});
  const [alertMessages, setAlertMessages] = useState([]);
  const [language, setLanguage] = useState('EN');

  const handleNamesSubmit = (nameArray) => {
    setGuards(nameArray);
    setShiftCounts(nameArray.reduce((acc, guard) => ({ ...acc, [guard]: 0 }), {}));
  };

  const handleAvailabilitySubmit = (avail) => {
    setAvailability(avail);
  };

  const handleAutoFill = () => {
    // const teamNames = ['Yael', 'Ofir', 'Shahar', 'Itay', 'Gabriel', 'Ohad', 'Orel', 'Ron', 'Sam', 'Adir']
    const teamNames = ['Adir', 'Ofir', 'Shahar', 'Itay', 'Gabriel', 'Ohad', 'Orel', 'Ron', 'Sam', 'Yael']
    setGuards(teamNames);
    setShiftCounts(teamNames.reduce((acc, guard) => ({ ...acc, [guard]: 0 }), {}));
  };

  const handleAutoAvail = () => {
    setAvailability(week.availability);
    handleAutoFill();
  };

  const incrementShiftCount = (guardName) => {
    setShiftCounts(prevCounts => ({
      ...prevCounts,
      [guardName]: prevCounts[guardName] + 1
    }));
  };

  const resetShiftCounts = () => {
    setShiftCounts(prevCounts => {
      const resetCounts = {};
      for (const guard in prevCounts) {
        resetCounts[guard] = 0;
      }
      return resetCounts;
    });
  };

  const handleScheduleCompletion = (messages) => {
    setAlertMessages(messages);
  };

  const resetApp = () => {
    window.location.reload();
  };

  const changeLanguage = () => {
    setLanguage(language === "EN" ? "HE" : "EN");
  };

  return (
    <div style={{ direction: language === "EN" ? "ltr" : "rtl" }} className="App">
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
          <AvailabilityForm guards={guards} onSubmit={handleAvailabilitySubmit} i8={language} />
        ) : (
          <>
            <SchedulePlanner
              availability={availability}
              guards={guards}
              onComplete={handleScheduleCompletion}
              incrementShiftCount={incrementShiftCount}
              resetShiftCounts={resetShiftCounts}
              i8={language}
            />
            <ShiftCount shiftCounts={shiftCounts} i8={language} />
            <button className="reset-button" onClick={resetApp}>{content[language].reset}</button>
          </>
        )}
      </main>
    </div>
  );
}

export default App;


