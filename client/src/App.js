import React from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './components/pages/Home';
import Header from './components/Header';
import Footer from  './components/Footer';
import Nav from './components/Nav';
import CreatePost from './components/pages/CreatePost';
import Login from './components/pages/Login';
import User from './components/pages/User';
import SinglePost from './components/pages/SinglePost';
import ContactUs from './components/pages/ContactUs';



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
          <Header />
          <Nav />
            <Routes>
            <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/createpost" 
                element={<CreatePost />} 
              />
              <Route 
                path="/user" 
                element={<User />} 
              />
              <Route
                path="/codes/:codeId"
                element={<SinglePost />}
              />
              <Route 
              path="/ContactUs"
              element={<ContactUs />}
              />
            </Routes>
          <Footer />
        </Router>
    </ApolloProvider>
  );
}

export default App;
