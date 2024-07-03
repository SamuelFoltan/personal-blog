import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { database, storage } from '../../utils/firebase/firebase.utils';
import './blog-form.styles.scss'; 

const BlogForm = () => {
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
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

      const storageRef = ref(storage, `blog-images/${image.name}`);
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
            saveBlogPost(downloadURL);
          });
        }
      );
    } catch (error) {
      console.error('Error uploading image: ', error);
      setUploading(false);
    }
  };

  const saveBlogPost = async (downloadURL) => {
    try {
      const blogPostData = {
        topic,
        text,
        description,
        imageUrl: downloadURL,
        createdAt: serverTimestamp(), 
        comments: [], 
      };

      const docRef = await addDoc(collection(database, 'blog-topics'), blogPostData);

      console.log('Blog post added with ID: ', docRef.id);
      setTopic('');
      setText('');
      setDescription('');
      setImage(null);
      setUploading(false);
      alert('Blog post added successfully!');
    } catch (error) {
      console.error('Error adding blog post: ', error);
      setUploading(false);
      alert('Failed to add blog post. Please try again.');
    }
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault(); 
      setText(text + '\n'); 
    }
  };

  return (
    <div className="blog-form">
      <h2>Add New Blog Post</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleTextareaKeyDown} 
            rows={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
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
              Upload Blog Post
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BlogForm;