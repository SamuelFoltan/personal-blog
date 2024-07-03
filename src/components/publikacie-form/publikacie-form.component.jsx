import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { database, storage } from '../../utils/firebase/firebase.utils';
import './publikacie-form.styles.scss'; 

const PublicationForm = () => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    try {
      setUploading(true);

      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          
        },
        (error) => {
          console.error('Error uploading image: ', error);
          setUploading(false);
        },
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            
            savePublication(downloadURL);
          });
        }
      );
    } catch (error) {
      console.error('Error uploading image: ', error);
      setUploading(false);
    }
  };

  const savePublication = async (downloadURL) => {
    try {
      const publicationData = {
        name,
        link,
        imageUrl: downloadURL,
        createdAt: serverTimestamp(), 
      };

      const docRef = await addDoc(collection(database, 'publikacie'), publicationData);

      console.log('Publication added with ID: ', docRef.id);
      setName('');
      setLink('');
      setImage(null);
      setUploading(false);
      alert('Publication added successfully!');
    } catch (error) {
      console.error('Error adding publication: ', error);
      setUploading(false);
      alert('Failed to add publication. Please try again.');
    }
  };

  return (
    <div className="publication-form">
      <h2>Add New Publication</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="form-group">
          {uploading ? (
            <p>Uploading image...</p>
          ) : (
            <button type="button" onClick={handleUpload}>
              Upload Publication
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PublicationForm;