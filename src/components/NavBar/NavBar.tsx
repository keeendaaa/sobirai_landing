import { Menu } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { throttleWithTrailingInvocation } from "../../utils";
import { cn } from "../../utils";

export interface NavigationItem {
  name: string;
  to: string;
}

// Simple logo component - можно заменить на ваш логотип
const NavLogo = ({ isScrolled }: { isScrolled: boolean }) => (
  <div
    className={cn("transition-all duration-500 flex items-center", {
      "size-12": !isScrolled,
      "size-10": isScrolled,
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
                </span>
              </ReactRouterLink>

              <ul className="ml-16 hidden items-center gap-6 lg:flex">
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
  );
}

function NavBarDesktopActions({ isScrolled }: { isScrolled: boolean }) {
  return (
    <div className="hidden items-center justify-end gap-3 lg:flex lg:flex-1">
      <button className="nav-contact-btn">
        Связаться с нами
      </button>
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
                <button 
                  className="nav-contact-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Связаться с нами
                </button>
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
  const menuStyles = cn("nav-menu-item", {
    "nav-menu-item-mobile": !!setMobileMenuOpen,
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
