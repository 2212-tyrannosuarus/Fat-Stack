import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <>
      {/* <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-decoration-none text-dark"
        >
          <img
            src="/assets/logo.png"
            alt="company logo"
            width="40"
            height="40"
            className="me-2"
          />{" "}
          WE ARE FARMERS
        </a>

        <ul className="nav col-12 col-md-auto mb-2 mb-md-0 justify-content-end">
          <li>
            <a href="#" className="nav-link px-2 text-dark">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 text-dark">
              Contact Us
            </a>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          {!isAuthenticated && (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
          )}
          {isAuthenticated && (
            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={user.picture}
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
              <ul className="dropdown-menu text-small">
                <li>
                  <a className="dropdown-item" href="/profile">
                    <BsPerson />
                    My Profile
                  </a>
                </li>
                <li>
                  <button className="dropdown-item">Settings</button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => logout()}>
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header> */}
    </>
  );
};

export default Navbar;
