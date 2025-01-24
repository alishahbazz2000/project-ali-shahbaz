import { useState, useEffect } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarMenuItem,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  NavbarMenu,
} from "@heroui/react";
import { Link, useNavigate } from "react-router";
import logo from "../assets/image/logo.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export default function NavigationBar() {
  const { authentication, userId } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "خانه",
      href: "/",
    },
    {
      label: "وبلاگ",
      href: "/post",
    },
    {
      label: "رویداد",
      href: "/event",
    },
    {
      label: "درباره ما",
      href: "/contactus",
    },
    {
      label: "داشبورد",
      href: "/admin",
    },
    {
      label: "ورود",
      href: "/auth/login",
    },
  ];
  useEffect(() => {
    (async () => {
      if (!userId) {
        return;
      }
      try {
        const result = await axios.get(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authentication}`, // ارسال token به صورت Bearer در هدر
            },
          }
        );
        setUser(result.data);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, [userId]);

  const logoutHandler = () => {
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("authToken");
    toast.dark("token removed from session storage");
    navigate("/auth/login", { replace: true });
  };

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="z-50 p-1"
    >
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="lg:hidden pr-3" justify="center">
        <NavbarBrand>
          <img src={logo} className="h-10 w-10 object-contain" alt="" />
          <p className="font-bold text-inherit">Redmaster</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-8 " justify="end">
        <NavbarBrand className="flex items-center gap-x-5">
          <img src={logo} className="h-10 w-10 object-contain" alt="" />
          <p className="font-bold text-inherit">Redmaster</p>
        </NavbarBrand>
        <NavbarItem>
          <Link to="/">خانه</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/post">وبلاگ</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/event">رویداد</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/contactus">درباره ما</Link>
        </NavbarItem>
      </NavbarContent>

      {user ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={user?.email}
                size="sm"
                src={user?.profilePhoto}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label={user?.firstName} variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">{user?.firstName}</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem
                as={Link}
                to={`/profile/user/${user?._id}`}
                key="profile-user"
              >
                صفحه شخصی
              </DropdownItem>
              <DropdownItem
                as={Link}
                to={`/profile/${user?._id}`}
                key="forgetpassword"
              >
                حساب کاربری
              </DropdownItem>
              <DropdownItem
                as={Link}
                to={`/auth/forgetpassword`}
                key="forgetpassword"
              >
                تغییر رمز عبور
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                <Button
                  variant="flat"
                  color="danger"
                  fullWidth
                  onClick={logoutHandler}
                >
                  خروج از حساب کاربری
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {user?.isAdmin && (
            <NavbarItem className="ms">
              <Button as={Link} color="primary" variant="flat" to="/admin">
                داشبورد
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link to="/auth/login">ورود</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="danger" to="/auth/signup" variant="flat">
              ثبت نام
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              to={`${item.href}`}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
