import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { database } from '../../utils/firebase/firebase.utils'; 
import "./meeting-form.styles.scss";

const MeetingForm = () => {
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const meetingRef = doc(database, 'meetings', 'meetingData');
      await setDoc(meetingRef, {
        day,
        time,
        date,
      });

      console.log('Meeting data successfully saved!');
      setDay('');
      setTime('');
      setDate('');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  return (
    <div className="meeting-form">
      <h2>Meeting Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="day">Day:</label>
          <input
            type="text"
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MeetingForm;
