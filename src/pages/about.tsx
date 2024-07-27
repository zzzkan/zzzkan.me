import React from "react";
import { HeadFC } from "gatsby";
import {
  Box,
  Divider,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import {} from "@chakra-ui/react";
import { Layout } from "@zzzkan/gatsby-theme-blog/src/components/Layout";
import { Seo } from "@zzzkan/gatsby-theme-blog/src/components/Seo";

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <Box textAlign={"center"} marginBottom={6}>
        <Heading as={"h1"} size={"xl"} marginBottom={9}>
          About
        </Heading>
        <Text marginTop={3}>
          日本の某企業でソフトを作る仕事の人になりました。アルフォートは水色派です。
        </Text>
        <Text>
          I am a software developer in Japan. The sky blue Alfort Chocolate is
          my fave.
        </Text>
      </Box>
      <Heading as={"h2"} size={"lg"} marginBottom={3}>
        Links
      </Heading>
      <UnorderedList marginBottom={3}>
        <ListItem>
          <Link
            href={"https://github.com/zzzkan"}
            target={"_blank"}
            rel={"noreferrer"}
            color={"tint"}
          >
            GitHub
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href={"https://twitter.com/_zzzkan"}
            target={"_blank"}
            rel={"noreferrer"}
            color={"tint"}
          >
            X (旧Twitter)
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href={"https://bsky.app/profile/zzzkan.me"}
            target={"_blank"}
            rel={"noreferrer"}
            color={"tint"}
          >
            Bluesky
          </Link>
        </ListItem>
      </UnorderedList>
      <Heading as={"h2"} size={"lg"} marginBottom={3}>
        Works
      </Heading>
      <UnorderedList marginBottom={3}>
        <ListItem>
          このブログサイトで使用しているGatsbyテーマとGatsbyスターター
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
                @zzzkan/gatsby-starter-blog
              </Link>
              （スターター）
            </ListItem>
          </UnorderedList>
        </ListItem>
      </UnorderedList>
      <Heading as={"h2"} size={"lg"} marginBottom={3}>
        Contact
      </Heading>
      <Text>
        「info@zzzkan.me」まで連絡ください（返信は別のアドレスから行う場合があります）。X等のSNSは一定期間見ないことがあり返信が遅れることがあります。
      </Text>
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC = ({ location }) => {
  const { pathname } = location;
  return (
    <Seo
      path={pathname}
      title={"About"}
      description={
        "zzzkanとこのサイトについて説明するページです。zzzkanはソフトを作る仕事の人です。アルフォートは水色派です。"
      }
    />
  );
};
