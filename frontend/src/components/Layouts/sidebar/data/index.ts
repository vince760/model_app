import type { ComponentType, SVGProps } from "react";
import * as Icons from "../icons";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type NavSubItem = {
  title: string;
  url: string;
};

export type NavItem = {
  title: string;
  url?: string; // leaf item uses url
  icon: IconType;
  items: NavSubItem[]; // dropdown items
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const NAV_DATA: NavSection[] = [
  {
    label: "Model Menu",
    items: [
      {
        title: "Logistic Regression",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
    ],
  },
];
