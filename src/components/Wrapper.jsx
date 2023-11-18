import { Flex, HStack } from "@chakra-ui/react";
import Navbar from "./Navbar";

function Wrapper(props) {
  return (
    <>
      <Navbar />
      <Flex justify="center" align="center">
        <HStack>{props.children}</HStack>
      </Flex>
    </>
  );
}

export default Wrapper;
