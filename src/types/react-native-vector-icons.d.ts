declare module "react-native-vector-icons/MaterialCommunityIcons" {
  import { ComponentType } from "react";
  import { TextProps } from "react-native";

  type IconProps = TextProps & {
    name: string;
    size?: number;
    color?: string;
  };

  const MaterialCommunityIcons: ComponentType<IconProps>;
  export default MaterialCommunityIcons;
}
