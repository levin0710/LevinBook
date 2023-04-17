import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './Read.css'

const Read = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", time: "", image: "", likes: 0, description: ''});


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

    useEffect(() => {
        const result = data.filter(item => String(item.id) === id)[0];
        setPost({title: result.title, time: result.time, image: result.image, likes: result.likes, description: result.description});
    }, [data, id]);

    const handleUpvote = () => {
        // handle upvote logic
    }

    const handleComment = (comment) => {
        // handle comment logic
    }

    return (
        <div className="ReadPosts">
            <div className="post-header">
                <span className="post-time">{getTimeAgoString(post.time)}</span>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-description">{post.description}</p>
            </div>
            <div className="post-image">
                <img src={post.image} alt="post image"/>
            </div>
            <div className="post-interactions">
                <button className="upvote-button" onClick={handleUpvote}>Upvote</button>
                <Link tyle={{ textDecoration: 'none' }} to={'../../edit/'+ id}>
                    <button className="edit-button">Edit</button>
                </Link>
            </div>
            <div className="post-comments">
                <h3>Comments</h3>
                {/* {post.comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p>{comment}</p>
                    </div>
                ))}
                <form onSubmit={(event) => {
                        event.preventDefault();
                        handleComment(event.target.comment.value);
                        event.target.reset();
                    }}>
                    <input type="text" name="comment" placeholder="Add a comment" />
                    <button type="submit">Comment</button>
                </form> */}
            </div>
        </div>  
    )
}

export default Read;
