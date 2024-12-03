import "@/styles/globals.css";
import { Roboto, Montserrat } from "next/font/google";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Provider, defaultSystem } from "@/components/ui/provider";
import { createSystem, defaultConfig } from "@chakra-ui/react"

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const montserrat = Montserrat({
  weight: ["500","700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap"
})

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `${montserrat},'Figtree', sans-serif` },
        body: roboto,
      },
    },
  },
})

export default function App({ Component, pageProps }) {
  return (
    <Provider theme={defaultSystem}>
      <Component {...pageProps} />
    </Provider>
  );
}
