import { useAuth } from "@/modules/context/authContext";
import { Button, Flex, HStack, Text, Image } from "@chakra-ui/react";
import Link from "next/link";
import Cookies from "js-cookie";

const Navbar = () => {
  const { isLogin, setIsLogin } = useAuth();

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      color="#6F4FD4"
      boxShadow="lg"
      mb={5}
    >
      <Link href="/">
        <Flex align="center" ml={5} cursor="pointer">
          <Image
            w={8}
            mr={3}
            src="https://www.nemaweb.org/images/library/reports-pubs-01.png"
            alt=""
          ></Image>
          <Text fontSize="2xl" fontWeight="bold">
            Library
          </Text>
        </Flex>
      </Link>
      <HStack>
        {!isLogin && (
          <Link href="/register">
            <Button width="6rem" borderRadius="50" bgColor="white">
              Register
            </Button>
          </Link>
        )}
        {!isLogin && (
          <Link href="/login">
            <Button
              width="6rem"
              borderRadius="50"
              color="white"
              bgColor="#6F4FD4"
            >
              Login
            </Button>
          </Link>
        )}
        {isLogin && (
          <Link href="/newbook">
            <Button bgColor="white" borderRadius={50}>
              Create New Book
            </Button>
          </Link>
        )}
        {isLogin && (
          <Button
            colorScheme="red"
            borderRadius={50}
            width="6rem"
            onClick={() => {
              Cookies.remove("isLogin");
              setIsLogin(false);
            }}
          >
            Logout
          </Button>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;
