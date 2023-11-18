import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { registerUser } from "../modules/fetch";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";
import { useState } from "react";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(e.target.name.value, e.target.email.value, password);
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setError(error?.message || "An error occurred");
  };

  return (
    <Wrapper>
      <Box w="100%" py={4} px={15} borderWidth="2px" borderRadius="lg">
        <Flex>
          <Box w={500}>
            <Image
              src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7873.jpg?w=740&t=st=1699709149~exp=1699709749~hmac=d8e95cbf962da1da3d633fd7f2f3e1054d3df50ae3cbb62780bf9722a84d5269"
              alt=""
            ></Image>
          </Box>

          <Box py={6} px={10} w={500}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Register
            </Text>
            <form onSubmit={handleSubmit}>
              {error && (
                <Box color="red.500" mb={4}>
                  {error}
                </Box>
              )}

              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="name" name="name" placeholder="Enter your name" />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {password !== confirmPassword && (
                  <Text fontSize="xs" color="red.500">
                    The password does not match
                  </Text>
                )}
              </FormControl>

              <Button
                mt={6}
                bgColor={"purple.500"}
                color={"white"}
                width={"7rem"}
                type="submit"
              >
                Register
              </Button>
            </form>
          </Box>
        </Flex>
      </Box>
    </Wrapper>
  );
};

export default Register;
