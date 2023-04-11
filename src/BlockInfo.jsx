import React from 'react';
import { Text, Card } from '@chakra-ui/react';

const BlockInfo = ({ block }) => {

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
    gasLimit,
    gasUsed,
    miner,
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
      width="200px"
      backgroundColor="rgba(55, 123, 172, 0.6)"
     
    >
      <Text fontWeight="bold" fontSize="xl" mb="4">
        Block #{number}
      </Text>
    
     
      <Text>
        <strong>Timestamp:</strong> {timestamp}
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
    </Card>
  );
};

export default BlockInfo;
