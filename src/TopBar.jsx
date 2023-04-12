import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  InputGroup,
  InputLeftAddon,
  HStack,
  Flex,
} from '@chakra-ui/react';

const TopBar = ({ setDisplayBlockNumber, setDisplayTransactionHash, setDisplayAddress, setDisplayType }) => {
  const [inputBlock, setInputBlock] = useState('');
  const [inputTransactionHash, setInputTransactionHash] = useState('');
  const [inputAddress, setInputAddress] = useState('');

  return (
    <Box bg="rgba(55, 123, 172, 0.6)" p={4} mb={6}>
      <Flex justify="center">
        <HStack spacing={4}>
          <InputGroup>
            <InputLeftAddon children="Block" />
            <Input
              type="text"
              placeholder="Enter block number"
              value={inputBlock}
              onChange={(e) => setInputBlock(e.target.value)}
            />
            <Button onClick={() => {
              setDisplayBlockNumber(parseInt(inputBlock));
              setDisplayType("displayBlock");
            }}>Go</Button>
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Txn Hash" />
            <Input
              type="text"
              placeholder="Enter transaction hash"
              value={inputTransactionHash}
              onChange={(e) => setInputTransactionHash(e.target.value)}
            />
            <Button onClick={() => {
              setDisplayTransactionHash(inputTransactionHash);
              setDisplayType("displayTransaction");
            }}>Go</Button>
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Address" />
            <Input
              type="text"
              placeholder="Enter address"
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
            />
            <Button onClick={() => {
              setDisplayAddress(inputAddress);
              setDisplayType("displayAddress");
            }}>Go</Button>
          </InputGroup>
        </HStack>
      </Flex>
    </Box>
  );
};

export default TopBar;
