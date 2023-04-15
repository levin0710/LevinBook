import React from 'react';
import './PostInFeed.css'

const PostInFeed = ({props}) => {
    return (
        <div className="post">
          <h2 className="post-title">{props.title}</h2>
          <p className="post-content">{props.content}</p>
        </div>
    );
};

export default PostInFeed;
