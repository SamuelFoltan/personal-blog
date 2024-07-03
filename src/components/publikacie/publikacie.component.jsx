import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { database,auth } from '../../utils/firebase/firebase.utils';
import PublicationDisplay from "../publikacia/publikacia.component";
import PublicationForm from "../publikacie-form/publikacie-form.component";
import './publikacie.styles.scss'; 

const Publikacie = () => {
	const [publications, setPublications] = useState([]);
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
	useEffect(() => {
	    const fetchPublications = async () => {
	    	const querySnapshot = await getDocs(collection(database, 'publikacie'));
	    	const fetchedPublications = querySnapshot.docs.map(doc => ({
	        	id: doc.id,
	        	...doc.data()
	    	}));
	     	setPublications(fetchedPublications);
	    };

	    fetchPublications();
	  }, []);

	if (!currentUser || currentUser.uid !== allowedUid) {
		return (
		    <div className="publications-list">
		      {publications.map(publication => (
		        <PublicationDisplay
		          name={publication.name}
		          imageUrl={publication.imageUrl}
		          link={publication.link}
		        />
		      ))}
		    </div>
	  	);
	};
	return (
		<div className="publications-list">
		    {publications.map(publication => (
		    	<PublicationDisplay
		    		name={publication.name}
		        	imageUrl={publication.imageUrl}
		        	link={publication.link}
		    	/>
		    ))}
		    <div className="centered-button">
              <button className="toggle-form-button" onClick={toggleForm}>
                {showForm ? 'x' : '+'}
              </button>
            </div>
            {showForm && <PublicationForm />}
		    </div>
	)
};

export default Publikacie;