import { useColorScheme } from 'react-native';
import { Colors, DrawerColors } from '@/constants/colors';

export function useTheme() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return {
    isDark,
    colors: Colors,
    drawerColors: DrawerColors,
    scheme,
  };
}
