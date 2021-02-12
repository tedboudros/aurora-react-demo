import HomeScreen from "pages/home-screen";
import WelcomeScreen from "pages/welcome";

export default [
  {
    path: "/home",
    component: HomeScreen,
    isExact: true,
  },
  {
    path: "/",
    component: WelcomeScreen,
    isExact: true,
  },
];
