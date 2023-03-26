import {
    extendTheme,
    theme as base,
    withDefaultColorScheme,
    withDefaultVariant,
  } from '@chakra-ui/react';
  
  const inputSelectStyles = {
    variants: {
      filled: {
        field: {
          _focus: {
            borderColor: 'brand.50',
            borderWidth: '5px'
          },
          backgroundColor: "white",
          borderColor: "#d4d4de",
          borderWidth: '1px'
        },
      },
    },
    // sizes: {
    //   md: {
    //     field: {
    //       borderRadius: 'none',
    //     },
    //   },
    // },
  };
  
  const theme = extendTheme(
    {
      colors: {
        brand: {
          50: '#dadaff',
        },
      },
      fonts: {
        heading: `Montserrat, ${base.fonts?.heading}`,
        body: `Inter, ${base.fonts?.body}`,
      },
      components: {
        Input: { ...inputSelectStyles },
        Select: { ...inputSelectStyles },
      },
    },
    withDefaultColorScheme({
      colorScheme: 'brand',
      components: ['Checkbox'],
    }),
    withDefaultVariant({
      variant: 'filled',
      components: ['Input', 'Select'],
    })
  );
  
  export default theme;