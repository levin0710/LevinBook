import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { FaThumbsUp } from 'react-icons/fa';
import { supabase } from '../client'
import ReactPlayer from 'react-player'
import './Read.css'
import { CircularProgress } from '@mui/material';

const Read = ({data, user}) => {

    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);


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
       
        const fetchPostData = async () => {
          const { data, error } = await supabase
            .from('Posts')
            .select()
            .eq('id', id);
          if (error) console.log(error);
          else {
            const p = data[0];
            setPost({
              title: p.title,
              time: p.time,
              image: p.image,
              likes: p.likes,
              description: p.description,
            });
          }
        };
    
        fetchPostData();
        const fetchComments = async () => {
          const { data: comments, error } = await supabase
            .from('Comments')
            .select()
            .eq('postId', id)
            .order('time', { ascending: false });
          if (error) console.log(error);
          else setComments(comments);
        };
        
        fetchComments();

    }, [data, id]);

    const handleUpvote = async (event) => {
        // handle upvote logic
        setPost((prevState) => ({ ...prevState, likes: prevState.likes + 1 }));
        event.preventDefault();
        await supabase
        .from('Posts')
        .update({likes: post.likes})
        .eq('id', id);

    }

    const createComment = async (event) => {
      event.preventDefault();
      const comment = event.target.comment.value
      event.target.reset();
      console.log("CALLING POST")
      await supabase
      .from('Comments')
      .insert({comment: comment, postId: id})
      .select();

      const fetchComments = async () => {
        const { data: comments, error } = await supabase
          .from('Comments')
          .select()
          .eq('postId', id)
          .order('time', { ascending: false });
        if (error) console.log(error);
        else setComments(comments);
      };
      
      fetchComments();
  }


    return (
        <div className="ReadPosts">
            { post == null ?
            <div className='progress-container'>
              <CircularProgress />
            </div> 
            :
            <div>
              <div className="post-header">
                <span className="post-time">{getTimeAgoString(post.time)}</span>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-description">{post.description}</p>
            </div>
            <div className="post-image">
              {ReactPlayer.canPlay(post.image) ? (
                <ReactPlayer url={post.image} playing='true' controls='true' pip='true' width={"100%"}/>
                ) : (
                <img src={post.image} alt="post image"/>
                )
              }

            </div>
            <div className="post-interactions">
                <button className="upvote-button" onClick={handleUpvote}>
                  <FaThumbsUp /> {post.likes}
                </button>
                <Link tyle={{ textDecoration: 'none' }} to={'../../edit/'+ id}>
                    <button className="edit-button">Edit</button>
                </Link>
            </div>
            <div className="post-comments">
                <h3>Comments</h3>
                {comments && comments.length > 0 ?
                comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <h6> {getTimeAgoString(comment.time)}</h6>
                        <p>{comment.comment}</p>
                    </div>
                )) : <h4>{'Be the first comment!'}</h4>
              }
                <form onSubmit={createComment}>
                    <input type="text" name="comment" placeholder="Add a comment" />
                    <button type="submit">Comment</button>
                </form>
            </div>
            </div>
            }
        </div>  
    )
}

export default Read;
