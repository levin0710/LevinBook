import React from 'react';
import './PostInFeed.css'
import { Link } from 'react-router-dom'

const PostInFeed = ({props}) => {
  
  function getTimeAgoString(timestamp) {
    const milliseconds = Date.now() - Date.parse(timestamp);
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 4);
    
    if (years > 0) {
      return `Posted ${years} year${years === 1 ? '' : 's'} ago`;
    }  
    else if (months > 0) {
      return `Posted ${months} month${months === 1 ? '' : 's'} ago`;
    }
    else if (weeks > 0) {
      return `Posted ${weeks} week${weeks === 1 ? '' : 's'} ago`;
    }
    else if (days > 0) {
      return `Posted ${days} day${days === 1 ? '' : 's'} ago`;
    }
    else if (days > 0) {
      return `Posted ${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
      return `Posted ${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes > 0) {
      return `Posted ${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else {
      return `Posted ${seconds} second${seconds === 1 ? '' : 's'} ago`;
    }
  }
    
  return (
      <Link style={{ textDecoration: 'none' }} to={'read/'+ props.id}>
        <div className="post">
          <p className="post-time">{getTimeAgoString(props.date)}</p>
          <h2 className="post-title">{props.title}</h2>
          <p className="post-content">{props.likes} Upvotes</p>
          
        </div>
      </Link>
    );
};

export default PostInFeed;
