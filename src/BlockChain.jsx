import React, { useRef, useState, useEffect } from 'react';
import BlockInfo from './BlockInfo';
import NewBlock from './NewBlock';

import { Box, Flex} from '@chakra-ui/react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ScaleFade } from '@chakra-ui/react';


const BlockChain = ({alchemy, setDisplayBlockNumber, setDisplayType}) => {
const [blockNumber, setBlockNumber] = useState();
const [blocks, setBlocks] = useState([]);
 
 
const sliderRef = useRef();
const transitionDuration = 300;

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);

  useEffect(() => {
    async function getBlocks() {
      if (!blockNumber) return;

      const numberOfBlocks = 10; // Change this value to fetch more or fewer blocks
      const blockPromises = [];

      for (let i = 0; i < numberOfBlocks; i++) {
        blockPromises.push(alchemy.core.getBlock(blockNumber - i));
      }

      const fetchedBlocks = await Promise.all(blockPromises);
      setBlocks(fetchedBlocks);
         
    }

    getBlocks();
  }, [blockNumber]);


  

  const loadMoreBlocks = async () => {
    const numberOfBlocks = 10;
    const blockPromises = [];

    for (let i = 0; i < numberOfBlocks; i++) {
      blockPromises.push(alchemy.core.getBlock(blockNumber - blocks.length - i));
    }

    const fetchedBlocks = await Promise.all(blockPromises);
    setBlocks([...blocks, ...fetchedBlocks]);
  };

  
   

  useEffect(() => {
    const handleScroll = (event) => {
      const { scrollLeft, scrollWidth, clientWidth } = event.target;

      // Check if the user has scrolled to the right edge of the slider
      if (scrollLeft + clientWidth >= scrollWidth) {
        loadMoreBlocks();
      }
    };

    const sliderElement = sliderRef.current;
    sliderElement.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      sliderElement.removeEventListener('scroll', handleScroll);
    };
  }, [loadMoreBlocks]);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      width="100%"
      pt="4"
    >
      <Box
        ref={sliderRef}
        display="flex"
        overflowX="scroll"
        py="4"
        px="2"
        width="100%"
        boxShadow="lg"
        borderRadius="lg"
        backgroundColor="rgba(55, 123, 172, 0.2)"
      >
        <Box mr="4">
          <NewBlock
            alchemy={alchemy}
            blockNumber={blockNumber}
            setBlockNumber={setBlockNumber}
            blocks={blocks}
            setBlocks={setBlocks}
          />
        </Box>
        <TransitionGroup component={null}>
          {blocks.map((block, index) => (
            <CSSTransition key={block.hash} timeout={transitionDuration} classNames="block">
              <Box mr="4">
                <ScaleFade initialScale={0.9} in>
                  <BlockInfo block={block} setDisplayBlockNumber={setDisplayBlockNumber} setDisplayType={setDisplayType}/>
                </ScaleFade>
              </Box>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Box>
    </Flex>
  );
};



export default BlockChain;
