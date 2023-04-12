import React from 'react';
import { Text, Card, Button } from '@chakra-ui/react';
const BlockInfo = ({ block, setDisplayBlockNumber, setDisplayType }) => {

  function timeSince(timestampInSeconds) {
    const timestampInMilliseconds = timestampInSeconds * 1000;
    const now = new Date();
    const secondsPast = Math.floor((now.getTime() - timestampInMilliseconds) / 1000);
  
    if (secondsPast < 60) {
      return `${secondsPast} seconds ago`;
    }
    const minutesPast = Math.floor(secondsPast / 60);
    if (minutesPast < 60) {
      return `${minutesPast} minutes ago`;
    }
    const hoursPast = Math.floor(minutesPast / 60);
    if (hoursPast < 24) {
      return `${hoursPast} hours ago`;
    }
    const daysPast = Math.floor(hoursPast / 24);
    if (daysPast < 30) {
      return `${daysPast} days ago`;
    }
    const monthsPast = Math.floor(daysPast / 30);
    if (monthsPast < 12) {
      return `${monthsPast} months ago`;
    }
    const yearsPast = Math.floor(monthsPast / 12);
    return `${yearsPast} years ago`;
  }
  

    if (!block) {
        return null;
      }

  const {
   // hash,
   // parentHash,
    number,
    timestamp,
   // nonce,
  //  difficulty,
  //  gasLimit,
    gasUsed,
 //   miner,
 //   extraData,
    transactions,
    baseFeePerGas,
 //   _difficulty,
  } = block;

  return (
    <Card
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      p="6"
      overflow="hidden"
      bg="white"
      width="300px"
      backgroundColor="rgba(55, 123, 172, 0.6)"
     
    >
      <Text fontWeight="bold" fontSize="xl" mb="4">
        Block #{number}
        <br />
       {timeSince(timestamp)}
      </Text>
     
      <Text>
        <strong>Gas Used:</strong> {gasUsed.toString()}
      </Text>
      {/*
      <Text>
        <strong>Miner:</strong> {miner}
       </Text>
       */}
  
         
      <Text>
        <strong>Base Fee Per Gas:</strong> {baseFeePerGas.toString()}
      </Text>
     <Text>
        <strong>Transactions in block:</strong> {transactions.length}
      </Text>
      <Button onClick={() => {
        setDisplayBlockNumber(number);
        setDisplayType("displayBlock");
        }}> See transactions </Button>
    </Card>

);
  
};

export default BlockInfo;
