import { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase/firebase.utils';
import encounterImage from './encounter_image.jpg';
import MeetingInfo from '../meeting-info/meeting-info.component';
import MeetingForm from '../meeting-form/meeting-form.component';
import './encounter.styles.scss';

const Encounter = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const allowedUid = 'ldM2NrCFcRdM2FnWkeSiHpd1OOL2'; 

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  if (!currentUser || currentUser.uid !== allowedUid) {
    return (
      <div className="encounter-container">
          <div className="content-section">
            <div className="encounter-content">
              <h2>Co je to Encounter?</h2>
              <p>
                Encounterová skupina je miestom skutočných stretnutí. 
                V skupine môžu ľudia zažívať blízkosť, akej je v bežnom živote málo, vytvárať vzťahy, založené na vzájomnej dôvere a otvorenosti. 
                Pocítiť, že so svojimi problémami nie sú sami, že  sú so spolučlenmi „na jednej lodi“. 
                Encounter  je to slobodný priestor na ukazovanie akéhokoľvek aktuálneho prežívania.
              </p>
              <p>
                Encounterovú skupinu môže navštevovať ktokoľvek, ale je určená hlavne pre ľudí, ktorí chcú dlhodobo pracovať na svojom sebarozvoji. 
              </p>
              <p>
                Stretnutia sa opakujú v pravidelných intervaloch približne raz za dva mesiace počas  víkendu. 
                Skupina nemáva vopred stanovený program a  dianie má možnosť ovplyvňovať každý z jej členov. 
                Stretnutiami sprevádzajú facilitátori, ktorí pomáhajú členom skupiny navzájom si porozumieť a podporujú ich.
              </p>
              <p>
                V encounterovej skupine ľudia nie sú vyzývaní k tomu, aby o sebe čokoľvek zverejňovali, ak sa sami pre to nerozhodnú. 
                Mlčanie je jedna z možností účasti v takejto skupine, aj keď aktívny prístup človeku i skupine prináša viac. 
                Je na slobodnom rozhodnutí každého jednotlivca či, ako a kedy sa zapojí. Učenie prebieha formou vlastného zážitku.  
              </p>
              <MeetingInfo/>
            </div>
            <div className="encounter-content-list">
              <h2>Encounter Moze Pomoct Pri:</h2>
              <ul>
                  <li>Lepšom porozumení seba a následne aj v porozumení iných</li>
                  <li>Redukcii strachu a zvýšení odvahy</li>
                  <li>Nárast vlastnej sebahodnoty a sebavedomia</li>
                  <li>Schopnosti priamejšej a efektívnejšej komunikácie</li>
                  <li>Zodpovednejšom prístupe k sebe a voči iným</li>
                </ul>
              </div>
              <div className= "encounter-image">
                <img src={encounterImage} alt="Encounter" />
              </div>
            </div>
          </div>
      
    );
  }

      return (
        <div className="encounter-container">
          <div className="content-section">
          <div className="encounter-content">
            <h2>Co je to Encounter?</h2>
            <p>
              Encounterová skupina je miestom skutočných stretnutí. 
              V skupine môžu ľudia zažívať blízkosť, akej je v bežnom živote málo, vytvárať vzťahy, založené na vzájomnej dôvere a otvorenosti. 
              Pocítiť, že so svojimi problémami nie sú sami, že  sú so spolučlenmi „na jednej lodi“. 
              Encounter  je to slobodný priestor na ukazovanie akéhokoľvek aktuálneho prežívania.
            </p>
            <p>
              Encounterovú skupinu môže navštevovať ktokoľvek, ale je určená hlavne pre ľudí, ktorí chcú dlhodobo pracovať na svojom sebarozvoji. 
            </p>
            <p>
              Stretnutia sa opakujú v pravidelných intervaloch približne raz za dva mesiace počas  víkendu. 
              Skupina nemáva vopred stanovený program a  dianie má možnosť ovplyvňovať každý z jej členov. 
              Stretnutiami sprevádzajú facilitátori, ktorí pomáhajú členom skupiny navzájom si porozumieť a podporujú ich.
            </p>
            <p>
              V encounterovej skupine ľudia nie sú vyzývaní k tomu, aby o sebe čokoľvek zverejňovali, ak sa sami pre to nerozhodnú. 
              Mlčanie je jedna z možností účasti v takejto skupine, aj keď aktívny prístup človeku i skupine prináša viac. 
              Je na slobodnom rozhodnutí každého jednotlivca či, ako a kedy sa zapojí. Učenie prebieha formou vlastného zážitku.  
            </p>
            <MeetingInfo/>
          </div>
          <div className="encounter-content-list">
            <h2>Encounter Moze Pomoct Pri:</h2>
            <ul>
                <li>Lepšom porozumení seba a následne aj v porozumení iných</li>
                <li>Redukcii strachu a zvýšení odvahy</li>
                <li>Nárast vlastnej sebahodnoty a sebavedomia</li>
                <li>Schopnosti priamejšej a efektívnejšej komunikácie</li>
                <li>Zodpovednejšom prístupe k sebe a voči iným</li>
            </ul>
          </div>
          <div className= "encounter-image">
            <img src={encounterImage} alt="Encounter" />
          </div>
        
          <div className="meeting-section">
            <div className="centered-button">
              <button className="toggle-form-button" onClick={toggleForm}>
                {showForm ? 'x' : '+'}
              </button>
            </div>
            {showForm && <MeetingForm />}
          </div>
          </div>
        </div>
        );
      };

      export default Encounter;