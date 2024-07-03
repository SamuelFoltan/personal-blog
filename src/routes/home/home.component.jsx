import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { database } from '../../utils/firebase/firebase.utils';
import AboutMe from "../../components/about-me/about-me.component";
import MeetingInfo from "../../components/meeting-info/meeting-info.component";
import './home.styles.scss';

const Home = () => {
  const [latestBlog, setLatestBlog] = useState(null);

  useEffect(() => {
    const fetchLatestBlog = async () => {
      try {
        const q = query(collection(database, 'blog-topics'), orderBy('createdAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestBlogData = querySnapshot.docs[0].data();
          setLatestBlog({ id: querySnapshot.docs[0].id, ...latestBlogData });
        }
      } catch (error) {
        console.error('Error fetching latest blog post: ', error);
      }
    };

    fetchLatestBlog();
  }, []);

  return (
    <div className="homepage">
      <AboutMe/>
      <header className="header">
        <div className="header-content">
          {latestBlog && (
            <div className="latest-blog">
              <h2>{latestBlog.topic}</h2>
              <p>{latestBlog.description}</p>
              <img src={latestBlog.imageUrl} alt={latestBlog.topic} />
              <p>Posted on: {latestBlog.createdAt ? latestBlog.createdAt.toDate().toLocaleDateString() : 'Unknown date'}</p>
              <a href ="/blog"><button>Read More</button></a> 
            </div>
          )}
          <MeetingInfo/>
        </div>
      </header>
    </div>
  );
};

export default Home;