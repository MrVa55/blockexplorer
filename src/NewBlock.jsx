import React from 'react';
import  {  useState, useEffect } from 'react';
import { Card, Text } from '@chakra-ui/react';

const NewBlock = ({ alchemy, blockNumber, setBlockNumber, blocks, setBlocks }) => {
    const [timeUntilNextBlock, setTimeUntilNextBlock] = useState(12);

    const resetTimerAndUpdateFirstBlock = async () => {
        setTimeUntilNextBlock(12);
      
        const newBlock = await alchemy.core.getBlock(blockNumber + 1);
        if (newBlock.number === blockNumber + 1){
        setBlockNumber(blockNumber + 1);
        setBlocks([newBlock, ...blocks.slice(0, -1)]);
        }else{window.location.reload(false);}
      };

      useEffect(() => {
        const timer = setInterval(() => {
          setTimeUntilNextBlock((prevTime) => {
            if (prevTime === 1) {
              resetTimerAndUpdateFirstBlock();
              return 12;
            } else {
              return prevTime - 1;
            }
          });
        }, 1000);
      
        return () => clearInterval(timer);
      }, [blockNumber]);
      
  

  return (
    <Card
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      p="6"
      overflow="hidden"
      bg="white"
      width="200px"
      height="100%"
      backgroundColor="rgba(55, 123, 172, 0.6)"
    >
        <Text fontWeight="bold" fontSize="xl" mb="4">
        Time until next block:
      </Text>
      <Text fontWeight="bold" fontSize="xl" mb="4">
        {timeUntilNextBlock}
      </Text>
    </Card>
    
  );
};

export default NewBlock;
