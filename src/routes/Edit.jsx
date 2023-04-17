import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



const Edit = (props) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", time: "", image: "", likes: 0, comments: []});

    // useEffect(() => {
    //     const result = props.filter(item => String(item.id) === id)[0];
    //     setPost({title: result.title, time: result.time, image: result.image, likes: result.likes,  comments: result.comments});
    // }, [props, id]);

    // DELETE post
    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
        .from('character')
        .delete()
        .eq('id', id); 

        window.location = "/";
    }

    const handleChange = (e) => {
        const newPostForm = {}
        const newValue = e.target.value;
        const key = e.target.name;
        post[key] = newValue;
        setPost((post) => ({...post, ...newPostForm}));
    }

    // UPDATE post
    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
        .from('character')
        .update({title: result.title, time: result.time, image: result.image, likes: result.likes,  comments: result.comments})
        .eq('id', id);

        window.location = "/";
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
              name="content"
              value={post.description}
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
          <button className="deleteButton" onClick={deletePost}>Delete</button>
      </form>
    </div>  
    )
}

export default Edit;