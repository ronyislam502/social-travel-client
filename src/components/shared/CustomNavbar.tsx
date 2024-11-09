import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";

import { ThemeSwitch } from "../theme-switch";

export const links = [
  {
    title: "Home",
    href: "/",
    secure: false,
  },
  {
    title: "About",
    href: "/about",
    secure: false,
  },
  {
    title: "Contact us",
    href: "/contact-us",
    secure: false,
  },
  {
    title: "Profile",
    href: "/profile",
    secure: true,
  },
  {
    title: "Dashboard",
    href: "/admin/users",
    secure: true,
  },
];

const CustomNavbar = () => {
  return (
    <Navbar className="dark:bg-dark bg-secondary-700">
      {/* Small screen navbar toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label="" />
      </NavbarContent>

      {/* Small screen brand */}
      <NavbarContent className="sm:hidden pr-3" justify="start">
        <NavbarBrand>
          <Link className="font-semibold text-secondary text-xl" href="/">
            Travel-Tips
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Large screen brand */}
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <Link className="font-semibold text-secondary text-xl" href="/">
            Travel-Tips
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Large screen links */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map((item, index) => {
          // Hide secure links if the user is

          return (
            <NavbarItem key={index}>
              <Link color="foreground" href={item.href}>
                {item.title}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* User actions (Sign in/Logout) and theme switch */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Sign in</Link>
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">
          <Button className="custom-btn">Logout</Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Small screen menu */}
      <NavbarMenu>
        {links.map((item, index) => {
          return (
            <NavbarMenuItem key={index}>
              <Link className="w-full" href={item.href}>
                {item.title}
              </Link>
            </NavbarMenuItem>
          );
        })}
        {/* Sign in/Logout button in the menu for small screens */}
        <NavbarMenuItem>
          <Link className="w-full" href="/login">
            Sign in
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Button className="w-full custom-btn">Logout</Button>
        </NavbarMenuItem>

        {/* Theme switcher in the small screen menu */}
        <NavbarMenuItem>
          <ThemeSwitch />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default CustomNavbar;
