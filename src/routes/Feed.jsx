import React, { useEffect, useState } from 'react';
import './Feed.css'
import '../index.css'
import PostInFeed from '../components/PostInFeed';
import { supabase } from '../client'
import CircularProgress from '@mui/material/CircularProgress';




const Feed = (props) => {

    const [posts, setPosts] = useState([]);
    const [flag, setFlag] = useState("");


    const handleChange = (event) => {
        const searchValue = event.target.value;
        setFlag(searchValue);
        searchItems(searchValue);
        console.log(searchValue);
    }
    
    const searchItems = (searchValue) => {
        if (searchValue !== "") {
            const filteredData = props.data.filter((item) =>    
                item.flag.toLowerCase().includes(searchValue.toLowerCase())
            );
            setPosts(filteredData);
        } else {
            setPosts(props.data);
        }
    };
    

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
            <div className='Order'>
                    <h3>
                    Flag:
                    </h3>
                    <select name="flag" value={flag} onChange={handleChange}>
                        <option value=""></option>
                        <option value="Question">Question</option>
                        <option value="Opinion">Opinion</option>
                        <option value="Funny">Funny</option>
                        <option value="Flex">Flex</option>
                    </select>
                    
                </div>      
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <PostInFeed props={{image: post.image, title: post.title, date: post.time, id: post.id, likes: post.likes, flag: post.flag}}/>
                ) :  <div className='progress-container'>
                        <CircularProgress />
                    </div>
            }
        </div>  
    )
}

export default Feed;