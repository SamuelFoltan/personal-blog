import BlogForm from "../blog-form/blog-form.component";
import BlogList from "../blog-list/blog-list.component";
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase/firebase.utils';
import "./blog.styles.scss";

const Blog = () => {
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
      <BlogList/>
    );
  };
  return (
    <div>
      <div className="centered-button">
        <button className="toggle-form-button" onClick={toggleForm}>
          {showForm ? 'x' : '+'}
        </button>
      </div>
      {showForm && <BlogForm/>}
      <BlogList/>  
    </div>
  );
};

export default Blog;