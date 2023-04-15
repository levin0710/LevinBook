import React, { useEffect, useState } from 'react';
import './Feed.css'
import '../index.css'
import PostInFeed from '../components/PostInFeed';


const Feed = (props) => {

    return (
        <div className='feed'>
            <div className='Order'>
                <h3>Order by: </h3>
                <button>Popular</button>
                <button>Time</button>      
            </div>
            <PostInFeed props={{title: 'Test', content: 'Please work'}} />
            <PostInFeed props={{title: 'Test', content: 'Please work'}} />
            <PostInFeed props={{title: 'Test', content: 'Please work'}} />
            <PostInFeed props={{title: 'Test', content: 'Please work'}} />
            <PostInFeed props={{title: 'Test', content: 'Please work'}} />
        </div>  
    )
}

export default Feed;