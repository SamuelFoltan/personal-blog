import { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, Timestamp, getDoc } from 'firebase/firestore';
import { database } from '../../utils/firebase/firebase.utils';
import './blog-item.styles.scss';

const BlogItem = ({ blogData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [commentsVisible, setCommentsVisible] = useState(false);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    try {
      const blogDoc = await getDoc(doc(database, 'blog-topics', blogData.id));
      if (blogDoc.exists()) {
        const data = blogDoc.data();
        setImageURL(data.imageUrl);
        setText(data.text); 
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('Error fetching blog data: ', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const comment = {
      text: commentText,
      author: authorName,
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      const blogRef = doc(database, 'blog-topics', blogData.id);

      await updateDoc(blogRef, {
        comments: arrayUnion(comment),
      });

      setComments([...comments, comment]);
      setCommentText('');
      setAuthorName('');
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const blogDoc = await getDoc(doc(database, 'blog-topics', blogData.id));
        if (blogDoc.exists()) {
          const data = blogDoc.data();
          setImageURL(data.imageUrl);
          setText(data.text); 
          setComments(data.comments || []);
        }
      } catch (error) {
        console.error('Error fetching additional data: ', error);
      }
    };

    fetchAdditionalData();
  }, [blogData.id]);

  return (
    <div className="blog-item">
      <div className="blog-header" onClick={handleOpenModal}>
        <div className="blog-image">
          <img src={imageURL} alt={blogData.topic} />
        </div>
        <div className="blog-content">
          <h2>{blogData.topic}</h2>
          <p>{blogData.description.substring(0, 100)}{blogData.description.length > 100 && '...'}</p>
          <p>Posted on: {blogData.createdAt ? blogData.createdAt.toDate().toLocaleDateString() : 'Unknown date'}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="custom-modal-overlay" onClick={handleCloseModal}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <h2>{blogData.topic}</h2>
              <img src={imageURL} alt={blogData.topic} className="modal-image" />
              
              <div
                className="modal-text"
                dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }}
              />

              <button className="toggle-comments-btn" onClick={handleToggleComments}>
                {commentsVisible ? 'Hide Comments' : 'Show Comments'}
              </button>

              {commentsVisible && (
                <div className="comments-section">
                  <h3>Comments</h3>
                  {comments.length > 0 ? (
                    <ul>
                      {comments.map((comment, index) => (
                        <li key={index}>
                          <p><strong>{comment.author}</strong>: {comment.text}</p>
                          <p><em>{comment.createdAt ? comment.createdAt.toDate().toLocaleDateString() : 'Pending date...'}</em></p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No comments yet.</p>
                  )}

                  <form onSubmit={handleCommentSubmit} className="comment-form">
                    <div className="form-group">
                      <label htmlFor="authorName">Name:</label>
                      <input
                        type="text"
                        id="authorName"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="commentText">Comment:</label>
                      <textarea
                        id="commentText"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows={3}
                        required
                      />
                    </div>
                    <button type="submit">Add Comment</button>
                  </form>
                </div>
              )}

              <button className="close-btn" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogItem;