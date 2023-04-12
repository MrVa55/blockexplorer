import { Alchemy, Network } from 'alchemy-sdk';
import { useState } from 'react';
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import TopBar from './TopBar';
import BlockChain from './BlockChain';
import BlockWithTransactions from './BlockWithTransactions';
import Transaction from './Transaction';
import Address from './Address';
import { extendTheme } from '@chakra-ui/react';



import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);



const customTheme = extendTheme({
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
  styles: {
    global: {
      'th, td': {
        color: 'rgba(255, 255, 255, 0.8)', // Off-white color
      },
    },
  },
});


function App() {
  const [displayType, setDisplayType] = useState(null); 
  const [displayBlockNumber, setDisplayBlockNumber] = useState(null);
  const [displayTransactionHash, setDisplayTransactionHash] = useState(null);
  const [displayAddress, setDisplayAddress] = useState(null);

  return (
    <div className="black-background">
    <div className="app-container">
      <ChakraProvider theme={customTheme}>
        <TopBar setDisplayBlockNumber={setDisplayBlockNumber} setDisplayTransactionHash={setDisplayTransactionHash} setDisplayAddress={setDisplayAddress} setDisplayType={setDisplayType} />
        <BlockChain alchemy={alchemy} setDisplayBlockNumber={setDisplayBlockNumber} setDisplayType={setDisplayType}/>
       {(displayType==="displayBlock")?
        <BlockWithTransactions alchemy={alchemy} displayBlockNumber={displayBlockNumber} setDisplayType={setDisplayType} setDisplayTransactionHash={setDisplayTransactionHash} setDisplayAddress={setDisplayAddress}/> : null}
      {(displayType==="displayTransaction")?
        <Transaction alchemy={alchemy} displayTransactionHash={displayTransactionHash} setDisplayAddress={setDisplayAddress} setDisplayBlockNumber={setDisplayBlockNumber} setDisplayType={setDisplayType} /> : null}
      {(displayType==="displayAddress")?
        <Address alchemy={alchemy} displayAddress={displayAddress} setDisplayAddress={setDisplayAddress} setDisplayTransactionHash={setDisplayTransactionHash} setDisplayType={setDisplayType}/> : null}  
      </ChakraProvider>
    </div>
    </div>
  );
}
// 
export default App;
