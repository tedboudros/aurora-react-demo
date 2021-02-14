import HomeScreen from "pages/home-screen";
import WelcomeScreen from "pages/welcome";

export default [
  {
    path: "/",
    component: HomeScreen,
    isExact: true,
  },
  {
    path: "/welcome",
    component: WelcomeScreen,
    isExact: true,
  },
];
