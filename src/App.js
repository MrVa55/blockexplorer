import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import BlockChain from './BlockChain';
import { extendTheme } from '@chakra-ui/react';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);



const customTheme =  extendTheme({
  components: {
    Text: {
      baseStyle: {
        color: 'rgba(255, 255, 255, 0.8)', // Off-white color
      },
    },
    Heading: {
      baseStyle: {
        color: 'rgba(255, 255, 255, 0.8)', // Off-white color
      },
    },
  },
});

function App() {

  return (
    <div className="app-container">
      <ChakraProvider theme={customTheme}>
        <BlockChain alchemy={alchemy} />
      </ChakraProvider>
    </div>
  );
}

export default App;
