import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client'
import './Create.css'


const Edit = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", time: "", image: "", description: ""});

    useEffect(() => {
        const result = data.filter(item => String(item.id) === id)[0];
        setPost({title: result.title, time: result.time, image: result.image, description: result.description});
    }, [data, id]);

    // DELETE post
    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
        .from('Posts')
        .delete()
        .eq('id', id); 

        window.location = "/";
    }

    const handleChange = (e) => {
      if (e.target.name === "image") {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
              setPost((post) => ({...post, image: reader.result}));
          };
      } else {
          setPost((post) => ({...post, [e.target.name]: e.target.value}));
      }
  }

    // UPDATE post
    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
        .from('Posts')
        .update({title: post.title, time: post.time, image: post.image, description: post.description})
        .eq('id', id);

        window.location = '/';
    }
    
    return (
        <div className="Create">
        <form className-="Create-form" onSubmit={updatePost}>
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
              name="description"
              value={post.description}
              onChange={handleChange}
              className='description'
            />
          </label>
          <label>
            Image URL:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
          <button className="deleteButton" onClick={deletePost}>Delete</button>
      </form>
    </div>  
    )
}

export default Edit;