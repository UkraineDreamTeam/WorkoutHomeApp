declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  import React from 'react';

  const content: React.FC<SvgProps>;
  export default content;
}
declare module '@env' {
  const content: 'module:react-native-dotenv';
  export const { EMAIL, PASSWORD } = content;
}
declare module 'react-native-component-inview' {
  const content: 'react-native-component-inview';
  export const InView = content;
}
