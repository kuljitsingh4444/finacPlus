import React, { useEffect, useRef } from 'react';
import ApiConfig from '../helpers/apiConfig';
import { comments as commentsLink } from '../helpers/url';
import Comment from './comment';
import '../styles/comments.css';
import AddComment from '../containers/addCommentContainer';

const loadId = 11711183;

const Comments = ({ addCommentOperation, comments }) => {
  const apiConfig = new ApiConfig();
  const allCommentsRef = useRef(null);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    apiConfig.get(commentsLink).then((response) => {
      addCommentOperation(response.comments);
    });
  };

  const scrollToBottom = () => {
    const element = allCommentsRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1);
  }, [comments]);

  return (
    <div className="comments-layout">
      <div>
        <div className="comments-header">
          <div className="comments-head">Comments ({comments.length ?? 0})</div>
          <div className="highlighted-text">LOAN ID - {loadId}</div>
        </div>
        <div ref={allCommentsRef} className="all-comments">
          {comments.map((comment, index) => {
            return <Comment key={index} comment={comment}></Comment>;
          })}
        </div>
        <AddComment></AddComment>
      </div>
      <div>
        <div className="close-icon">{'\u2A2F'}</div>
      </div>
    </div>
  );
};

export default Comments;
