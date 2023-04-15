import React, { useEffect, useState } from 'react';
import './Create.css'

const Create = () => {

    const [post, setPost] = useState({title: '', content: '', image: ''});

    const handleChange = (e) => {
        const newPostForm = {}
        const newValue = e.target.value;
        const key = e.target.name;
        post[key] = newValue;
        setPost((post) => ({...post, ...newPostForm}));
    }

    const createPost = async (event) => {
        event.preventDefault();
        console.log("CALLING POST")
        await supabase
        .from('Posts')
        .insert({title: post.title, content: post.content, image: post.image})
        .select();

        window.location = "/";
    }
    return (
        <div className="Create">
        <form className-="Create-form" onSubmit={createPost}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Content:
            <textarea
              name="content"
              value={post.content}
              onChange={handleChange}
              className='content'
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={post.image}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
      </form>
    </div> 
    );
}

export default Create;
