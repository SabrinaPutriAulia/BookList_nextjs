import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Image,
  Text,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Books({ id, title, author, image, year }) {
  return (
    <Link href={`/detail/${id}`}>
      <Card
        key={id}
        direction={{ base: "column", sm: "row" }}
        cursor="pointer"
        overflow={"hidden"}
        width={"21rem"}
        height={"15rem"}
        mb={4}
        mr={5}
      >
        <Image
          src={`${image}`}
          alt={`${id}-${title}`}
          maxW={{ base: "100%", sm: "180" }}
        ></Image>
        <Stack>
          <CardBody>
            <Heading size="md">{title}</Heading>
            <Text>{author} </Text>
            <Text>{year} </Text>
          </CardBody>
          <CardFooter>
            <Button variant="solid" bg="#6F4FD4" color={"white"}>
              Book Details
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </Link>
  );
}
