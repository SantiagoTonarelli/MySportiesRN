import { ImageSourcePropType } from "react-native";

export interface ActivitySelect {
  activity: Activity;
  name: string;
  ci: string;
  date: Date;
}

export interface Activity {
  img: ImageSourcePropType;
  title: string;
}
