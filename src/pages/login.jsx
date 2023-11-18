import { useAuth } from "@/modules/context/authContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  Image,
  Flex,
} from "@chakra-ui/react";
import { loginUser } from "../modules/fetch";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";
import Wrapper from "@/components/Wrapper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast();
  const { isLogin, setIsLogin } = useAuth();

  const handleLogin = async () => {
    try {
      await loginUser(email, password);

      toast({
        title: "Logged In",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      Cookies.set("isLogin", true);
      setIsLogin(true);
      router.push("/"); // Redirect ke halaman lain setelah berhasil login.
    } catch (e) {
      const errorMessage = e.message || "An error occurred. Please try again.";

      toast({
        title: "An error occurred.",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      setError(errorMessage);
    }
  };

  return (
    <Wrapper>
      <Box
        w="100%"
        py={4}
        px={15}
        mx="auto"
        borderWidth="2px"
        borderRadius="lg"
      >
        <Flex>
          <Box w={500}>
            <Image
              src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7873.jpg?w=740&t=st=1699709149~exp=1699709749~hmac=d8e95cbf962da1da3d633fd7f2f3e1054d3df50ae3cbb62780bf9722a84d5269"
              alt=""
            ></Image>
          </Box>

          <Box py={6} px={10} w={500}>
            {error && (
              <Box color="red.500" mb={4}>
                {error}
              </Box>
            )}

            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Login
            </Text>

            <FormControl isRequired w={"auto"}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              mt={6}
              bgColor={"purple.500"}
              color={"white"}
              onClick={handleLogin}
              width={"5rem"}
            >
              Login
            </Button>
          </Box>
        </Flex>
      </Box>
    </Wrapper>
  );
};

export default Login;
