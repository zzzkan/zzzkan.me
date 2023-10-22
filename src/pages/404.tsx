import React from "react";
import { HeadFC, Link as GatsbyLink } from "gatsby";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { Layout } from "@zzzkan/gatsby-theme-blog/src/components/Layout";

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <Box textAlign={"center"}>
        <Heading as={"h1"} size={"xl"} marginBottom={3}>
          404
        </Heading>
        <Text marginBottom={12}>
          このページはすでに削除されているかURLが間違っている可能性があります。
        </Text>
        <Link as={GatsbyLink} to={"/"} marginX={"auto"} color={"tint"}>
          トップへ戻る
        </Link>
      </Box>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => {
  return (
    <>
      <title>ページが見つかりませんでした - zzzkan.me</title>
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
};
