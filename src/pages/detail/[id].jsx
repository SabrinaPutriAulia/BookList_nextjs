import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  VStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";
import Link from "next/link";
import { deleteBook } from "@/modules/fetch";
import { useAuth } from "@/modules/context/authContext";
import { prisma } from "@/utils/prisma";
import Image from "next/image";

export default function BookDetails({ book }) {
  const router = useRouter();
  const { isLogin } = useAuth();

  const handleDeleteBook = async () => {
    try {
      await deleteBook(router.query.id);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <Flex my="6">
        <Box w="300px">
          <Image
            src={`/${encodeURIComponent(book.image)}`}
            alt={book.title}
            width={300}
            height={450}
          />
        </Box>
        <VStack ml="8" align="start">
          <Heading as="h1" size="2xl">
            {book.title}
          </Heading>
          <Text fontSize="xl" fontWeight="semibold" color="gray.600" mt="2">
            {book.author}
          </Text>
          <Text fontSize="md" fontWeight="medium" color="gray.700" mt="4">
            {book.pages} pages
          </Text>
          <Text fontSize="md" fontWeight="medium" color="gray.700" mt="2">
            Published by {book.publisher}
          </Text>
          <Text fontSize="md" fontWeight="medium" color="gray.700" mt="2">
            First published {book.year}
          </Text>

          {isLogin && (
            <HStack>
              <Popover>
                <PopoverTrigger>
                  <Button colorScheme="red">Delete</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Confirmation!</PopoverHeader>
                  <PopoverBody>
                    Are you sure you want to delete this book?
                  </PopoverBody>
                  <Button onClick={handleDeleteBook} colorScheme="red">
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
              <Link href={`/edit/${router.query.id}`}>
                <Button bgColor="orange.300" color={"white"}>
                  Edit
                </Button>
              </Link>
            </HStack>
          )}
        </VStack>
      </Flex>
    </Wrapper>
  );
}

export async function getStaticPaths() {
  // get all books id
  const books = await prisma.book.findMany({
    select: {
      id: true,
    },
  });
  const paths = books.map((book) => ({
    params: { id: book.id.toString() },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(context.params.id) },
    });

    return {
      props: {
        book,
      },
      revalidate: 10,
    };
  } catch (e) {
    console.log(e);
    return {
      props: {},
    };
  }
}
