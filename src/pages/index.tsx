import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { HeadFC } from "gatsby";
import { Box, Center, Flex, Heading, HStack, Link } from "@chakra-ui/react";
import { Layout } from "@zzzkan/gatsby-theme-blog/src/components/Layout";
import { Seo } from "@zzzkan/gatsby-theme-blog/src/components/Seo";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Flex alignItems={"center"} justifyContent={"center"} height={"50vh"}>
        <Box>
          <Heading as={"h1"} size={"4xl"} textAlign={"center"} marginBottom={3}>
            Home
          </Heading>
          <Center marginBottom={3}>
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

export const Head: HeadFC = () => {
  return <Seo path={"/"} title={"ホーム"} />;
};
