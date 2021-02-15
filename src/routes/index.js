import Home from "pages/home-screen";
import Welcome from "pages/welcome";
import Settings from "pages/settings";

import { Settings as SettingsIcon } from "assets/icons";

export default [
  {
    path: "/",
    component: Home,
    isExact: true,
  },
  {
    path: "/welcome",
    component: Welcome,
    isExact: true,
  },
  {
    path: "/settings",
    component: Settings,
    name: "Settings",
    icon: SettingsIcon,
    isApp: true,
    isExact: true,
  },
];
