import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../../utils/firebase/firebase.utils';
import BlogItem from '../blog-item/blog-item.component';
import './blog-list.styles.scss';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'blog-topics'));
        const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blog posts: ', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blog-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {filteredBlogs.length > 0 ? (
        <div className="blog-grid">
          {filteredBlogs.map(blog => (
            <BlogItem key={blog.id} blogData={blog} />
          ))}
        </div>
      ) : (
        <p>No blog posts found.</p>
      )}
    </div>
  );
};

export default BlogList;