import { extendTheme, baseTheme } from "@chakra-ui/react"

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  colors: {
    brand: baseTheme.colors.red,
    base: baseTheme.colors.gray,
  },
  semanticTokens: {
    colors: {
      tint: { default: "brand.700", _dark: "brand.200" },
      primaryText: { default: "base.800", _dark: "base.100" },
      secondaryText: { default: "base.600", _dark: "base.400" },
      onTintText: { default: "white", _dark: "base.900" },
      primaryBackground: { default: "white", _dark: "base.900" },
      secondaryBackground: {
        default: "RGBA(0, 0, 0, 0.02)",
        _dark: "RGBA(255, 255, 255, 0.02)",
      },
      codeBackground: {
        default: "RGBA(0, 0, 0, 0.02)",
        _dark: "RGBA(255, 255, 255, 0.02)",
      },
      highlightBackground: {
        default: "RGBA(0, 0, 0, 0.03)",
        _dark: "RGBA(255, 255, 255, 0.04)",
      },
    },
  },
  styles: {
    global: {
      html: {
        scrollPaddingTop: "12",
        scrollbarGutter: "stable",
      },
    },
  },
})

export default theme
