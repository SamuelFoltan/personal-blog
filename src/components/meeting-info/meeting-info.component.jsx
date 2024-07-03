import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../../utils/firebase/firebase.utils'; 
import './meeting-info.styles.scss';

const MeetingInfo = () => {
  const [meetingData, setMeetingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const meetingRef = doc(database, 'meetings', 'meetingData');
        const docSnap = await getDoc(meetingRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const formattedDate = formatMeetingDate(data.date); 
          setMeetingData({ ...data, formattedDate });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingData();
  }, []);

  const formatMeetingDate = (dateString) => {
    const dateObject = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const slovakLocale = 'sk-SK';
    return dateObject.toLocaleDateString(slovakLocale, options);
  };

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="meeting-info">
      <h2>Cas dalsieho encounter stretnutia</h2>
      {meetingData ? (
        <div className="meeting-details">
          <p><strong>Den:</strong> {meetingData.day}</p>
          <p><strong>Cas:</strong> {meetingData.time}</p>
          <p><strong>Datum:</strong> {meetingData.formattedDate}</p>
        </div>
      ) : (
        <p className="no-data">No meeting data found.</p>
      )}
    </div>
  );
};

export default MeetingInfo;