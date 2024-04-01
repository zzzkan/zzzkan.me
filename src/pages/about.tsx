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
          日本の某メーカーでソフトを作る仕事の人になりました。アルフォートは水色派です。
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
            X (Twitter)
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
      <Divider as={"hr"} marginY={6} />
      <Heading as={"h2"} size={"lg"} marginBottom={3}>
        Privacy Policy
      </Heading>
      <Text>
        当サイトでは、Googleによるアクセス解析ツール「Google
        Analytics」を利用しています。
      </Text>
      <Text>
        Google
        Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
        この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
      </Text>
      <Text marginBottom={3}>
        Google Analyticsの利用に関して、詳しくは
        <Link
          href={
            "https://marketingplatform.google.com/about/analytics/terms/jp/"
          }
          target={"_blank"}
          rel={"noreferrer"}
          color={"tint"}
        >
          Google アナリティクス利用規約
        </Link>
        をご覧ください。
      </Text>
      <Heading as={"h2"} size={"lg"} marginBottom={3}>
        Disclaimers
      </Heading>
      <Text>
        当サイトからのリンクやバナーなどの移動先で提供される情報、サービス等について一切の責任を負いません。
      </Text>
      <Text marginBottom={3}>
        当サイトに掲載されている情報は、可能な限り正確な情報を提供するよう努めていますが、正確性や安全性を保証するものではありません。また、情報は告知なしに変更および削除されることがあります。
      </Text>
      <Heading as={"h2"} size={"lg"} marginBottom={3}>
        Contact
      </Heading>
      <Text>
        <Link
          href={
            "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAFOjdtFUMDNCTDc1WUZQT09EODlRWFFET01QWE85My4u"
          }
          target={"_blank"}
          rel={"noreferrer"}
          color={"tint"}
        >
          問い合わせフォーム（Microsoft Forms）
        </Link>
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
