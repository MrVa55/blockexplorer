import React from 'react';
import  { useState, useEffect } from 'react';
import { Text, Card, Button, Link } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import {Utils} from "alchemy-sdk";

const truncateAddress = (address) => {
    if (!address) return '';
  
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

const BlockWithTransactions = ({ alchemy, displayBlockNumber, setDisplayType, setDisplayTransactionHash, setDisplayAddress }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function getTransactions() {
          if (!displayBlockNumber) return;
                    
        const blockData = await alchemy.core.getBlockWithTransactions(displayBlockNumber) ;
        const loadedTransactions = blockData.transactions
        setTransactions(loadedTransactions);
        
        }
     
        getTransactions();
        
      }, [displayBlockNumber]);
    


      if (!transactions || transactions.length === 0) {
        return <Text>This block has no transactions</Text>;
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
            backgroundColor="rgba(55, 123, 172, 0.2)"
           
          >
            <Text fontWeight="bold" fontSize="xl" mb="4">
            Transactions in block #{displayBlockNumber}
            </Text>
            <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>From</Th>
                <Th>To</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr key={transaction.hash}>
                   <Td>
                        <Link onClick={() => {
                            setDisplayAddress(transaction.from);
                            setDisplayType("displayAddress");
                             }}>
                            {truncateAddress(transaction.from)}
                        </Link>
                    </Td>
                    <Td>
                        <Link onClick={() => {
                            setDisplayAddress(transaction.to);
                            setDisplayType("displayAddress");
                             }}>
                            {truncateAddress(transaction.to)}
                        </Link>
                    </Td>
                    <Td>{parseFloat(parseFloat(Utils.formatEther(transaction.value)).toFixed(4))}</Td>
                   <Td> <Button textColor="black" onClick={() => {
                            setDisplayTransactionHash(transaction.hash);
                            setDisplayType("displayTransaction");
                 }}> See transaction </Button></Td>
    

                </Tr>
              ))}
            </Tbody>
          </Table>
        </Card>
        );
      }
    };
    
    export default BlockWithTransactions;
     
   

