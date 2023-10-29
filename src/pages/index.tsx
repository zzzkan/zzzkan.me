import React, { useState } from "react";
import { HeadFC } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import {
  Box,
  Button,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import {} from "@chakra-ui/react";
import { Layout } from "@zzzkan/gatsby-theme-blog/src/components/Layout";
import { Seo } from "@zzzkan/gatsby-theme-blog/src/components/Seo";

const HomePage: React.FC = () => {
  const [email, setEmail] = useState("😴😴😴@😴😴😴");
  const handleButtonClick = () => {
    setEmail(
      String.fromCharCode(
        137 - 15,
        110 + 12,
        125 - 3,
        30 + 24,
        65 - 17,
        21 + 29,
        59 - 9,
        18 + 31,
        66 - 14,
        26 + 22,
        77 - 22,
        35 + 19,
        70 - 6,
        106 + 5,
        125 - 8,
        93 + 23,
        126 - 18,
        90 + 21,
        124 - 13,
        77 + 30,
        73 - 27,
        95 + 4,
        128 - 17,
        102 + 7
      )
    );
  };
  const boxShadowStyle = useColorModeValue("lg", "dark-lg");
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
      <Heading as={"h2"} size={"lg"} marginBottom={3}>
        Contact
      </Heading>
      <Text marginBottom={3}>X（Twitter）またはメールまでご連絡ください。</Text>
      <Wrap spacing={6} marginBottom={3}>
        <WrapItem>
          <Button
            boxShadow={boxShadowStyle}
            backgroundColor={"secondaryBackground"}
            onClick={handleButtonClick}
          >
            メールアドレスを表示
          </Button>
        </WrapItem>
        <WrapItem marginY={"auto"}>{email}</WrapItem>
      </Wrap>
    </Layout>
  );
};

export default HomePage;

export const Head: HeadFC = () => {
  return <Seo path={"/"} title={"ホーム"} />;
};
