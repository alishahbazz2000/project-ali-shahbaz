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
import React from "react";
export const EditIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1.5em"
      role="presentation"
      viewBox="0 0 20 20"
      className="text-primary animate-bounce"
      width="1.5em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={14}
        strokeWidth={2}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};
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
          <p className="font-bold text-inherit">پیکچین</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-8 " justify="end">
        <NavbarBrand className="flex items-center gap-x-5">
          <EditIcon />
          <p className="font-bold text-inherit">پیکچین</p>
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
