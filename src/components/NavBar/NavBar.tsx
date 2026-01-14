import { LogIn, Menu } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { throttleWithTrailingInvocation } from "../../utils";
import { useIsLandingPage } from "../../hooks/useIsLandingPage";
import { cn } from "../../utils";
import DarkModeSwitcher from "../DarkModeSwitcher";
import { Announcement } from "./Announcement";

export interface NavigationItem {
  name: string;
  to: string;
}

// Simple logo component - можно заменить на ваш логотип
const NavLogo = ({ isScrolled }: { isScrolled: boolean }) => (
  <div
    className={cn("transition-all duration-500 flex items-center", {
      "size-8": !isScrolled,
      "size-7": isScrolled,
    })}
  >
    <span className="logo-text">
      собер.<span className="logo-gradient">ru</span>
    </span>
  </div>
);

export default function NavBar({
  navigationItems,
}: {
  navigationItems: NavigationItem[];
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isLandingPage = useIsLandingPage();

  useEffect(() => {
    const throttledHandler = throttleWithTrailingInvocation(() => {
      setIsScrolled(window.scrollY > 0);
    }, 50);

    window.addEventListener("scroll", throttledHandler);

    return () => {
      window.removeEventListener("scroll", throttledHandler);
      throttledHandler.cancel();
    };
  }, []);

  return (
    <>
      {isLandingPage && <Announcement />}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled && "top-4",
        )}
      >
        <div
          className={cn("transition-all duration-300", {
            "bg-background/90 border-border mx-4 rounded-full border pr-2 shadow-lg backdrop-blur-lg md:mx-20 lg:pr-0":
              isScrolled,
            "bg-background/80 border-border mx-0 border-b backdrop-blur-lg":
              !isScrolled,
          })}
        >
          <nav
            className={cn(
              "flex items-center justify-between transition-all duration-300",
              {
                "p-3 lg:px-6": isScrolled,
                "p-6 lg:px-8": !isScrolled,
              },
            )}
            aria-label="Global"
          >
            <div className="flex items-center gap-6">
              <ReactRouterLink
                to="/"
                className="text-foreground hover:text-primary flex items-center transition-colors duration-300 ease-in-out"
              >
                <NavLogo isScrolled={isScrolled} />
                <span
                  className={cn(
                    "text-foreground font-semibold leading-6 transition-all duration-300",
                    {
                      "ml-2 text-sm": !isScrolled,
                      "ml-2 text-xs": isScrolled,
                    },
                  )}
                >
                  Собе.ru
                </span>
              </ReactRouterLink>

              <ul className="ml-4 hidden items-center gap-6 lg:flex">
                {renderNavigationItems(navigationItems)}
              </ul>
            </div>
            <NavBarMobileMenu
              isScrolled={isScrolled}
              navigationItems={navigationItems}
            />
            <NavBarDesktopActions isScrolled={isScrolled} />
          </nav>
        </div>
      </header>
    </>
  );
}

function NavBarDesktopActions({ isScrolled }: { isScrolled: boolean }) {
  return (
    <div className="hidden items-center justify-end gap-3 lg:flex lg:flex-1">
      <ul className="flex items-center justify-center gap-2 sm:gap-4">
        <DarkModeSwitcher />
      </ul>
      <ReactRouterLink
        to="#contact"
        className={cn(
          "ml-3 font-semibold leading-6 transition-all duration-300",
          {
            "text-sm": !isScrolled,
            "text-xs": isScrolled,
          },
        )}
      >
        <div className="text-foreground hover:text-primary flex items-center transition-colors duration-300 ease-in-out">
          Связаться с нами{" "}
          <LogIn
            size={isScrolled ? "1rem" : "1.1rem"}
            className={cn("transition-all duration-300", {
              "ml-1 mt-[0.1rem]": !isScrolled,
              "ml-1": isScrolled,
            })}
          />
        </div>
      </ReactRouterLink>
    </div>
  );
}

function NavBarMobileMenu({
  isScrolled,
  navigationItems,
}: {
  isScrolled: boolean;
  navigationItems: NavigationItem[];
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex lg:hidden">
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className={cn(
              "text-muted-foreground hover:text-muted hover:bg-accent inline-flex items-center justify-center rounded-md transition-colors",
            )}
          >
            <span className="sr-only">Open main menu</span>
            <Menu
              className={cn("transition-all duration-300", {
                "size-8 p-1": !isScrolled,
                "size-6 p-0.5": isScrolled,
              })}
              aria-hidden="true"
            />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <ReactRouterLink to="/" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Собе.ru</span>
                <NavLogo isScrolled={false} />
              </ReactRouterLink>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 flow-root">
            <div className="divide-border -my-6 divide-y">
              <ul className="space-y-2 py-6">
                {renderNavigationItems(navigationItems, setMobileMenuOpen)}
              </ul>
              <div className="py-6">
                <ReactRouterLink to="#contact" onClick={() => setMobileMenuOpen(false)}>
                  <div className="text-foreground hover:text-primary flex items-center justify-end transition-colors duration-300 ease-in-out">
                    Связаться с нами <LogIn size="1.1rem" className="ml-1" />
                  </div>
                </ReactRouterLink>
              </div>
              <div className="py-6">
                <DarkModeSwitcher />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function renderNavigationItems(
  navigationItems: NavigationItem[],
  setMobileMenuOpen?: Dispatch<SetStateAction<boolean>>,
) {
  const menuStyles = cn({
    "block rounded-lg px-3 py-2 text-sm font-medium leading-7 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors":
      !!setMobileMenuOpen,
    "text-sm font-normal leading-6 text-foreground duration-300 ease-in-out hover:text-primary transition-colors":
      !setMobileMenuOpen,
  });

  return navigationItems.map((item) => {
    return (
      <li key={item.name}>
        <ReactRouterLink
          to={item.to}
          className={menuStyles}
          onClick={setMobileMenuOpen && (() => setMobileMenuOpen(false))}
          target={item.to.startsWith("http") ? "_blank" : undefined}
        >
          {item.name}
        </ReactRouterLink>
      </li>
    );
  });
}
