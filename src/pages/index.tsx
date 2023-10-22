import React from "react";
import { HeadFC } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import {
  Box,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Layout } from "@zzzkan/gatsby-theme-blog/src/components/Layout";
import { Seo } from "@zzzkan/gatsby-theme-blog/src/components/Seo";

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <Box textAlign={"center"} marginBottom={6}>
        <Heading as={"h1"} size={"xl"} marginBottom={3}>
          Home
        </Heading>
        <StaticImage
          src="../../contents/images/icon.png"
          alt="zzzkan"
          width={90}
          style={{ borderRadius: "50%" }}
        />
        <Text marginTop={3}>
          ソフトを作る仕事の人になりました。アルフォートは水色派です。
        </Text>
        <Text>
          I am a software developer. The sky blue Alfort Chocolate is my fave.
        </Text>
      </Box>
      <Heading as={"h2"} size={"lg"} marginBottom={3}>
        Links
      </Heading>
      <UnorderedList marginBottom={3}>
        <ListItem>
          GitHub:{" "}
          <Link
            href={"https://github.com/zzzkan"}
            target={"_blank"}
            rel={"noreferrer"}
            color={"tint"}
          >
            @zzzkan
          </Link>
        </ListItem>
        <ListItem>
          X (Twitter):{" "}
          <Link
            href={"https://twitter.com/_zzzkan"}
            target={"_blank"}
            rel={"noreferrer"}
            color={"tint"}
          >
            @_zzzkan
          </Link>
        </ListItem>
      </UnorderedList>
      <Heading as={"h2"} size={"lg"} marginBottom={3}>
        Works
      </Heading>
      <UnorderedList marginBottom={3}>
        <ListItem>
          シンプルなブログのためのGatsbyテーマとスターター
          <UnorderedList>
            <ListItem>
              <Link
                href={"https://www.npmjs.com/package/@zzzkan/gatsby-theme-blog"}
                target={"_blank"}
                rel={"noreferrer"}
                color={"tint"}
              >
                @zzzkan/gatsby-theme-blog
              </Link>
              （テーマ）
            </ListItem>
            <ListItem>
              <Link
                href={"https://github.com/zzzkan/gatsby-starter-blog"}
                target={"_blank"}
                rel={"noreferrer"}
                color={"tint"}
              >
                @zzzkan/gatsby-starter-blog"
              </Link>
              （スターター）
            </ListItem>
          </UnorderedList>
        </ListItem>
      </UnorderedList>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => {
  return <Seo path={"/"} title={"ホーム"} />;
};