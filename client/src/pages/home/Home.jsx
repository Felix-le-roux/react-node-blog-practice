import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';

import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts' + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <div className='home'>
      <Header />
      <div className='home__content'>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
