import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { type SiteMetadataType } from "@zzzkan/gatsby-theme-blog/src/types/siteMetadataType";
import { type ThemeOptionType } from "@zzzkan/gatsby-theme-blog/src/types/themeOptionType";

type Props = Pick<SiteMetadataType, "author" | "publicationYear"> &
  Pick<ThemeOptionType, "links">;

export const Footer: React.FC<Props> = () => {
  return (
    <Box as={"footer"} position={"sticky"} top={"100vh"}>
      <Center marginBottom={3}>
        <HStack>
          <StaticImage
            src="../../../../../contents/images/icon.png"
            alt="zzzkan"
            width={60}
            style={{ borderRadius: "50%" }}
          />
          <Box>
            <Heading as={"div"} fontSize={"lg"} fontWeight={"semibold"}>
              zzzkan
            </Heading>
            <Text fontSize={"sm"}>アルフォートは水色派です。</Text>
          </Box>
        </HStack>
      </Center>
      <Flex alignItems={"end"}>
        <Spacer />
        <Text fontSize={"sm"}>
          © 2023 zzzkan, Built with{" "}
          <Link
            href={"https://www.gatsbyjs.com/"}
            target={"_blank"}
            rel={"noreferrer"}
            color={"tint"}
          >
            Gatsby
          </Link>
        </Text>
      </Flex>
    </Box>
  );
};
