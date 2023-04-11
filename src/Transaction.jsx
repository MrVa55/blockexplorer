import React from 'react';
import  { useState, useEffect } from 'react';
import { Text, Card } from '@chakra-ui/react';


const Transaction = ({ alchemy, displayTransactionHash }) => {
    const [transactionData, setTransactionData] = useState();

    useEffect(() => {
        async function getTransactionData() {
          if (!displayTransactionHash) return;
                      
        const loadedTransactionData = await alchemy.core.getTransactionReceipt(displayTransactionHash) ;
        setTransactionData(loadedTransactionData);
        
        }
     
        getTransactionData();
        console.log(transactionData)
      }, [displayTransactionHash]);
    


      if (!transactionData) {
        return ("No data found for this transaction");
      } else {
        return (
            <Card
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
            p="6"
            overflow="hidden"
            bg="white"
            width="60%"
            margin="40px"
            backgroundColor="rgba(55, 123, 172, 0.6)"
          >
            <Text fontWeight="bold" fontSize="xl" mb="4">
              Transaction #{transactionData.transactionIndex + 1} in block #{transactionData.blockNumber}
            </Text>
            <Text>
              Transaction Hash: {transactionData.transactionHash}
            </Text>
            <Text>
              To: {transactionData.to}
            </Text>
            <Text>
              From: {transactionData.from}
            </Text>
            <Text>Confirmations: {transactionData.confirmations}</Text>
            <Text>
              Cumulative Gas Used: {transactionData.cumulativeGasUsed.toString()}
            </Text>
            <Text>
              Effective Gas Price: {transactionData.effectiveGasPrice.toString()}
            </Text>
          </Card>
        );
      }
    };
    
    export default Transaction;
     
   

