import './App.css';
import { React, useEffect, useState } from 'react';
import { useRoutes, useLocation } from 'react-router-dom'
import Create from './routes/Create.jsx'
import Edit from './routes/Edit.jsx'
import Feed from './routes/Feed';
import Read from './routes/Read';
import NavBar from './components/NavBar';
import { supabase } from './client'


const App = () => {
  
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const {data} = await supabase
        .from('Posts')
        .select()
        .order('time', { ascending: false });
  
      setPosts(data);
      setFilteredPosts(data);
    };
  
    // Fetch data when location changes to "/"
    if (location.pathname === '/') {
      fetchPosts();
    }
  
  }, [location]);
  

  

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<NavBar data={posts} onSearch={setFilteredPosts} />,
      children:[
        {
          index: true,
          element: <Feed data={filteredPosts}/>
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
