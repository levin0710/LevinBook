import './App.css';
import { React, useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom'
import Create from './routes/Create.jsx'
import Edit from './routes/Edit.jsx'
import Feed from './routes/Feed';
import Read from './routes/Read';
import NavBar from './components/NavBar';
import { supabase } from './client'


const App = () => {
  
 
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      // READ all post from table
      const fetchPosts = async () => {
          const {data} = await supabase
          .from('Posts')
          .select().order('time', { ascending: false });;
          // set state of posts
          setPosts(data)
          }
      fetchPosts()
  }, []);

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<NavBar/>,
      children:[
        {
          index: true,
          element: <Feed data={posts}/>
        },
        {
          path:"/edit/:id",
          element: <Edit data={posts} />
        },
        {
          path:"/new",
          element: <Create/>
        },
        {  
          path:"/read/:id",
          element: <Read data={posts} />
        }
      ]
    }
    
  ]);

  return ( 

    <div className="App">
        {element}
    </div>

  );
}

export default App;
