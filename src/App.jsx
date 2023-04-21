import './App.css';
import React, { useEffect, useState } from 'react';
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
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user);
      console.log(user)
      
    }
    fetchUserData();

    const fetchPosts = async () => {
      const { data } = await supabase
        .from('Posts')
        .select()
        .order('time', { ascending: false });
  
      setPosts(data);
      setFilteredPosts(data);
    };
  
    if (location.pathname === '/') {
      fetchPosts();
    }
  
  }, [location]);
  
  const login = async () => {   
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    
  }
  
  const routes = useRoutes([
    {
      path: "/",
      element: <NavBar data={posts} onSearch={setFilteredPosts} />,
      children:[
        {
          index: true,
          element: <Feed data={filteredPosts} user={user}/>
        },
        {
          path:"/edit/:id",
          element: <Edit data={posts} user={user} />
        },
        {
          path:"/new",
          element: <Create user={user}/>
        },
        {  
          path:"/read/:id",
          element: <Read data={posts} user={user} />
        }
      ]
    } 
  ]);

  return ( 
    <div className="App">
      {user ? routes : (
        <div class="container">
          <button onClick={login}>Login with Github</button>
        </div>
      )}
    </div>
  );
}

export default App;
