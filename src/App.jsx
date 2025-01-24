import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeSwitcher } from "./components/themeSwitcher";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import NavigationBar from "./components/navigationBar";
import CopyRight from "./components/copyRight";
import { ToastContainer } from "react-toastify";
import BannerCompoentn from "./components/banner";

export default function App() {
  const location = useLocation();
  const isAdminSubdomain = location.pathname.startsWith("/admin");
  const isAuthSubdomain = location.pathname.startsWith("/auth");
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {isAdminSubdomain || isAuthSubdomain ? null : <BannerCompoentn />}
        {isAdminSubdomain || isAuthSubdomain ? null : <NavigationBar />}
        {/* {navigatioin.state === "loading" ? <CustomLoader /> : <Outlet />} */}
        <Outlet />
        <ToastContainer />
        <ScrollRestoration
          getKey={(location) => {
            const paths = ["/", "/todo"];
            return paths.includes(location.pathname)
              ? location.pathname
              : location.key;
          }}
        />
        {isAdminSubdomain || isAuthSubdomain ? null : <CopyRight />}
        <ThemeSwitcher />
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export async function loader() {
  const name = "toplearn";
  const address = "https://www.toplearn.com";
  return { name, address };
}
