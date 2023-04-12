import React from 'react';
import  { useState, useEffect } from 'react';
import { Text, Card, Link, Button } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const truncateAddress = (address) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

const Address = ({ alchemy, displayAddress, setDisplayAddress, setDisplayTransactionHash, setDisplayType  }) => {
    const [balance, setBalance] = useState();
    const [transfersTo, setTransfersTo]= useState([]);
    const [transfersFrom, setTransfersFrom]= useState([]);

    useEffect(() => {
        async function getBalance() {
          if (!displayAddress) return;
                      
        const loadedBalance = await alchemy.core.getBalance(displayAddress) ;
        const loadedTransfersTo = await alchemy.core.getAssetTransfers(
            {toAddress: displayAddress,
             category: ["external"],
             maxCount:10,
            });
        const loadedTransfersFrom = await alchemy.core.getAssetTransfers(
             {fromAddress: displayAddress,
             category: ["external"],
             maxCount:10,
             });
        
        setBalance(loadedBalance.toString());
        setTransfersTo(loadedTransfersTo.transfers);
        setTransfersFrom(loadedTransfersFrom.transfers);
        }
        
        getBalance();
        
      }, [displayAddress]);
    


      if (!displayAddress) {
        return ("Address not found");
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
              Address {displayAddress}
            </Text>
            <Text>
              Balance: {balance / 10e18}
            </Text>
       
            <Text fontWeight="bold" fontSize="xl" mb="4">
            Last 10 transfers to this address
            </Text>
            <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>From</Th>
                <Th>Value</Th>
                <Th>Block</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transfersTo.map((transfer) => (
                <Tr key={transfer.uniqueId}>
                   <Td>
                        <Link onClick={() => {
                            setDisplayAddress(transfer.from);
                            setDisplayType("displayAddress");
                             }}>
                            {truncateAddress(transfer.from)}
                        </Link>
                    </Td>
                    
                    <Td>
                    {transfer.value.toFixed(4)}
                    </Td>
                   <Td>
                        {parseInt(transfer.blockNum, 16)}
                    </Td>
                   <Td> <Button textColor="black" onClick={() => {
                            setDisplayTransactionHash(transfer.uniqueId.split(':')[0]);
                            setDisplayType("displayTransaction");
                 }}> See transaction </Button></Td>
    

                </Tr>
              ))}
            </Tbody>
          </Table>

          <Text fontWeight="bold" fontSize="xl" mb="4">
            Last 10 transfers from this address
            </Text>
            <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>To</Th>
                <Th>Value</Th>
                <Th>Block</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transfersFrom.map((transfer) => (
                <Tr key={transfer.uniqueId}>
                   <Td>
                        <Link onClick={() => {
                            setDisplayAddress(transfer.to);
                            setDisplayType("displayAddress");
                             }}>
                            {truncateAddress(transfer.from)}
                        </Link>
                    </Td>
                    
                    <Td>
                    {transfer.value.toFixed(4)}
                    </Td>
                   <Td>
                        {parseInt(transfer.blockNum, 16)}
                    </Td>
                   <Td> <Button textColor="black" onClick={() => {
                            setDisplayTransactionHash(transfer.uniqueId.split(':')[0]);
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
    
    export default Address;