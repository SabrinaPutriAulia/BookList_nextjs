import Wrapper from "@/components/Wrapper";
import { prisma } from "@/utils/prisma";
import Books from "../components/Books";
import { Wrap, WrapItem } from "@chakra-ui/react";

export default function Homepage(props) {
  return (
    <Wrapper>
      <Wrap px={5}>
        {props?.books?.map((book) => (
          // eslint-disable-next-line react/jsx-key
          <WrapItem>
            <Books key={`${book.id} ${book.title}`} {...book} />
          </WrapItem>
        ))}
      </Wrap>
    </Wrapper>
  );
}

export async function getServerSideProps() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return {
      props: {
        books,
      },
    };
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
