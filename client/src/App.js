import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './components/pages/Home';
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
        <div>
        <Header />
        <Nav />
        <Home />
        <Footer />
        </div>
    </ApolloProvider>
  );
}

export default App;
