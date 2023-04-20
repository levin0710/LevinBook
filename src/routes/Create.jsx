import React, { useEffect, useState } from 'react';
import './Create.css'
import { supabase } from '../client'

const Create = () => {

    const [post, setPost] = useState({title: '', description: '', image: '', flag: ''});
    const [inputType, setInputType] = useState('upload');


    const handleInputTypeChange = (e) => {
      setInputType(e.target.value);
    }
    
  
  
    const handleChange = (e) => {
        if (e.target.name === "image" && inputType =='upload') {
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

    const createPost = async (event) => {
        event.preventDefault();
        console.log("CALLING POST")
        await supabase
        .from('Posts')
        .insert({title: post.title, description: post.description, image: post.image, flag: post.flag})
        .select();

        window.location = "/";
    }
    return (
        <div className="Create">
        <form className="Create-form" onSubmit={createPost}>
          <div className='Flags'>
            <label>
              Flag:
              <select name="flag" value={post.flag} onChange={handleChange}>
              <option value=""></option>
                <option value="Question">Question</option>
                <option value="Opinion">Opinion</option>
                <option value="Funny">Funny</option>
                <option value="Flex">Flex</option>
              </select>
            </label>
          </div>
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
            Description:
            <textarea
              name="description"
              value={post.description}
              onChange={handleChange}
              className='description'
            />
          </label>
        <div>  
          <div className='radioButtons'>
            <div className='radioButton'>
              <input 
                type="radio" 
                name="inputType" 
                value="upload" 
                checked={inputType === "upload"}
                onChange={handleInputTypeChange}
              />
              <label>Upload</label>
              </div>
            
              <div className='radioButton'>
              <input 
                type="radio" 
                name="inputType" 
                value="url" 
                checked={inputType === "url"}
                onChange={handleInputTypeChange}
              />
              <label>URL</label>
            </div>
          </div>
        {inputType === "upload" && (
          <input
            type="file"
            name="image"
            accept={"image/*"}
            onChange={handleChange}
          />
      )}
      {inputType === "url" && (
          <input
            type="text"
            name="image"
            value={post.image}
            onChange={handleChange}
          />
      )}
      </div>
          <button type="submit">Submit</button>
      </form>
    </div> 
    );
}


export default Create