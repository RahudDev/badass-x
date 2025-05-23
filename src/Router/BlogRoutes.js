import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blog1 from '../pages/BlogSection.js/Blog1';
import Blog2 from '../pages/BlogSection.js/Blog2';
import Blog3 from '../pages/BlogSection.js/Blog3';
import Blog4 from '../pages/BlogSection.js/Blog4';
import Blog5 from '../pages/BlogSection.js/Blog5';
import Blog6 from '../pages/BlogSection.js/Blog6';
import Blog7 from '../pages/BlogSection.js/Blog7';
import Blog8 from '../pages/BlogSection.js/Blog8';
import Blog9 from '../pages/BlogSection.js/Blog9';
import Blog10 from '../pages/BlogSection.js/Blog10';



const BlogRoutes = () => {
  return (
    <Routes>
      <Route path="/1" element={<Blog1 />} />
      <Route path="/2" element={<Blog2 />} />
      <Route path="/3" element={<Blog3 />} />
      <Route path="/4" element={<Blog4 />} />
      <Route path="/5" element={<Blog5 />} />
      <Route path="/6" element={<Blog6 />} />
      <Route path="/7" element={<Blog7 />} />
      <Route path="/8" element={<Blog8 />} />
      <Route path="/9" element={<Blog9 />} />
      <Route path="/10" element={<Blog10 />} />

      {/* Add more blog routes here as needed */}
    </Routes>
  );
};

export default BlogRoutes;
