import "@/styles/globals.css";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Provider, defaultSystem } from "@/components/ui/provider";


export default function App({ Component, pageProps }) {
  return (
    <Provider theme={defaultSystem}>
      <Component {...pageProps} />
    </Provider>
  );
}
