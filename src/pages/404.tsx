import React from "react"
import { HeadFC } from "gatsby"
import { Heading, Text } from "@chakra-ui/react"
import { Layout } from "@zzzkan/gatsby-theme-blog/src/components/Layout"

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <Heading as={"h1"} size={"xl"} textAlign={"center"} marginBottom={3}>
        404
      </Heading>
      <Text textAlign={"center"}>The page was not found.</Text>
    </Layout>
  )
}


export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
