import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#f5f7fb",
      },
    },
  },
});

export default customTheme;
