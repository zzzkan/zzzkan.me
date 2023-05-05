import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Copyright } from "@zzzkan/gatsby-theme-blog/src/components/Copyright";
import { ExternalLinks } from "@zzzkan/gatsby-theme-blog/src/components/ExternalLinks";
import { type SiteMetadataType } from "@zzzkan/gatsby-theme-blog/src/types/siteMetadataType";
import { type ThemeOptionType } from "@zzzkan/gatsby-theme-blog/src/types/themeOptionType";

type Props = Pick<SiteMetadataType, "author" | "publicationYear"> &
  Pick<ThemeOptionType, "links">;

export const Footer: React.FC<Props> = ({ author, publicationYear, links }) => {
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
          <div>
            <Heading as={"div"} fontSize={"lg"} fontWeight={"semibold"}>
              zzzkan
            </Heading>
            <Text fontSize={"sm"}>アルフォートは水色派です。</Text>
          </div>
        </HStack>
      </Center>
      <Flex alignItems={"end"}>
        <Copyright author={author} publicationYear={publicationYear} />
        <Spacer />
        <ExternalLinks links={links} />
      </Flex>
    </Box>
  );
};
