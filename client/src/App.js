import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from  './components/Footer';
import Nav from './components/Nav';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
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
              path="/profile" 
              element={<Profile />}
            />
            <Route 
              path="/createPost" 
              element={<CreatePost />}
            />
            <Route 
              path="/displayPost" 
              element={<DisplayPost />}
            />
            <Route 
              path="/createPost" 
              element={<CreatePost />}
            />
          </Routes>
        <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
