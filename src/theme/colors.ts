export type ThemeMode = "light" | "dark";

export type ThemeColors = {
  brand: string;
  brand2: string;
  brand3: string;
  bg: string;
  bgAlt: string;
  card: string;
  cardStrong: string;
  line: string;
  overlay: string;
  text: string;
  muted: string;
  danger: string;
  success: string;
  surface: string;
  surfaceElevated: string;
  surfaceSoft: string;
  textOnBrand: string;
  shadow: string;
};

export const lightColors: ThemeColors = {
  brand: "#FF6A2B",
  brand2: "#FF8A4F",
  brand3: "#FFC18A",
  bg: "#FFF8F2",
  bgAlt: "#FFF0E4",
  card: "#FFFFFF",
  cardStrong: "#FFF3E8",
  line: "rgba(116,70,32,0.12)",
  overlay: "rgba(37,20,9,0.2)",
  text: "#1F1813",
  muted: "#74584A",
  danger: "#D94A38",
  success: "#15A86B",
  surface: "#FFFFFF",
  surfaceElevated: "#FFFDFB",
  surfaceSoft: "#FFF3E8",
  textOnBrand: "#FFF7F1",
  shadow: "#D88952",
};

export const darkColors: ThemeColors = {
  brand: "#FF8A4F",
  brand2: "#FFA46F",
  brand3: "#FFD1AA",
  bg: "#17110D",
  bgAlt: "#211812",
  card: "#241B16",
  cardStrong: "#2F231D",
  line: "rgba(255, 208, 170, 0.12)",
  overlay: "rgba(0,0,0,0.5)",
  text: "#FFF3EC",
  muted: "#C9A99A",
  danger: "#F16B57",
  success: "#49C98B",
  surface: "#241B16",
  surfaceElevated: "#2A201A",
  surfaceSoft: "#32261F",
  textOnBrand: "#FFF7F1",
  shadow: "#000000",
};

export const lightTheme = lightColors;
export const darkTheme = darkColors;
export const Colors = lightColors;
