import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { HeadFC } from "gatsby";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { Layout } from "@zzzkan/gatsby-theme-blog/src/components/Layout";
import { Seo } from "@zzzkan/gatsby-theme-blog/src/components/Seo";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Flex alignItems={"center"} justifyContent={"center"} height={"50vh"}>
        <Box>
          <Heading as={"h1"} size={"4xl"}>
            zzzkan.me
          </Heading>
          <Text fontSize={"sm"} marginBottom={3}>
            zzzkan's website
          </Text>
          <Center>
            <HStack spacing={"6"}>
              <Link as={GatsbyLink} to="/about" color={"tint"} fontSize={"xl"}>
                About
              </Link>
              <Link as={GatsbyLink} to="/blog" color={"tint"} fontSize={"xl"}>
                Blog
              </Link>
            </HStack>
          </Center>
        </Box>
      </Flex>
    </Layout>
  );
};

export default HomePage;

export const Head: HeadFC = ({ location }) => {
  const { pathname } = location;
  return (
    <Seo
      path={pathname}
      title={"Home"}
      description={
        "zzzkanのウェブサイトです。ソフトウェア関連の話題が多いと思いますが気が向いたことなら何でも書くところ。アルフォートは水色派です。"
      }
    />
  );
};
