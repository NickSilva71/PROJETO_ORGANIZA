import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
    },
  },
})


export const color = {
    background: { base: "bg", _dark: "bg" },
    subBackground: { base: "bg.subtle", _dark: "bg.subtle"},
    title: { base: "teal.600", _dark: "teal.400" },
    text: { base: "gray.700", _dark: "gray.300" },
    subText: { base: "gray.600", _dark: "gray.300"},

    cardBackground: { base: "gray.100", _dark: "gray.800" },
};