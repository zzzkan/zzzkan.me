import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { Box, Button, Flex, HStack, Link, Spacer } from "@chakra-ui/react";
import { Title } from "@zzzkan/gatsby-theme-blog/src/components/Title";
import { ToggleColorModeButton } from "@zzzkan/gatsby-theme-blog/src/components/ToggleColorModeButton";
import { type SiteMetadataType } from "@zzzkan/gatsby-theme-blog/src/types/siteMetadataType";

type Props = Pick<SiteMetadataType, "title">;

export const Header: React.FC<Props> = ({ title }) => {
  return (
    <Box
      as={"header"}
      position={"sticky"}
      top={0}
      zIndex={"sticky"}
      background={"primaryBackground"}
      marginBottom={9}
    >
      <Flex alignItems={"center"}>
        <Title title={title} />
        <Spacer />
        <HStack>
          <Link as={GatsbyLink} to="/blog" _hover={{ textDecoration: "none" }}>
            <Button
              backgroundColor={"primaryBackground"}
              padding={1}
              borderRadius={"50%"}
            >
              Blog
            </Button>
          </Link>
          <ToggleColorModeButton />
        </HStack>
      </Flex>
    </Box>
  );
};
