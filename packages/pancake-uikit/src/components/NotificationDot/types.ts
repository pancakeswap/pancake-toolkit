import { Colors } from "../..";

export interface NotificationDotProps {
  show?: boolean;
  color?: keyof Colors;
  children: React.ReactElement | React.ReactElement[];
}

export interface DotProps {
  show: boolean;
  color: keyof Colors;
}
