// Adds the theme control (Auto by the sun, Light, Dark) as a navbar item type: `type: 'custom-themeMode'`.
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import ThemeMode from '@site/src/components/ThemeMode';

export default {
  ...ComponentTypes,
  'custom-themeMode': ThemeMode,
};
