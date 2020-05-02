import { lazy } from "react";
const NotFound = lazy(() => import("./components/NotFound"));
const Main = lazy(() => import("./containers/Main"));
const Articles = lazy(() => import("./containers/Articles"));
const PrivacyPolicy = lazy(() => import("./containers/PrivacyPolicy"));

const Routes = [
  {
    path: "/",
    exact: true,
    component: Main,
  },
  {
    path: "/articles",
    exact: true,
    component: Main,
  },
  {
    path: "/articles/:id",
    exact: true,
    component: Articles,
  },
  {
    path: "/privacy-policy",
    exact: true,
    component: PrivacyPolicy,
  },
  {
    component: NotFound,
  },
];

export default Routes;
