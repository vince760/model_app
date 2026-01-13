import { url } from "inspector";
import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "Model Menu",
    items: [
      {
        title: "Logistic Regression",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "KNN",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Linear SVM",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Kernel SVM (RBF)",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Gaussian",
        url: "/tables",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Decision Tree",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Random Forest",
        icon: Icons.Alphabet,
        items: [],
      },
    ],
  },
];
