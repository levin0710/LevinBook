import React, { useEffect, useState } from 'react';
import './Feed.css'
import '../index.css'
import PostInFeed from '../components/PostInFeed';
import { supabase } from '../client'



const Feed = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(props.data);
    }, [props]);

    const sortBy = async (event) => {
        event.preventDefault();
        let orderBy = 'time'
        if (event.target.innerHTML =='Popular'){
            orderBy = 'likes'
        }

        const {data} = await supabase.from("Posts").select().order(orderBy, { ascending: false });
        setPosts(data)
    }

    return (
        <div className='feed'>
            <div className='Order'>
                <h3>Order by: </h3>
                <button onClick={sortBy}>Popular</button>
                <button onClick={sortBy}>Time</button>      
            </div>
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <PostInFeed props={{image: post.image, title: post.title, date: post.time, id: post.id, likes: post.likes}}/>
                ) : <h2>{'No Posts Yet 😞'}</h2>
            }
        </div>  
    )
}

export default Feed;