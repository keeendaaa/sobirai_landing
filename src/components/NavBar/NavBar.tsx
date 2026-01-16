import React, { useEffect, useRef, useState } from "react";
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
      sobir<span className="logo-ai">ai</span>
    </span>
  </div>
);

export default function NavBar({
  navigationItems,
}: {
  navigationItems: NavigationItem[];
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const throttledHandler = throttleWithTrailingInvocation(() => {
      setIsScrolled(window.scrollY > 0);

      const header = headerRef.current as HTMLElement | null;
      if (!header) {
        setIsOverDark(false);
        return;
      }

      const rect = header.getBoundingClientRect();
      const probeY = Math.min(window.innerHeight - 1, rect.bottom + 4);
      const probeX = Math.min(window.innerWidth - 1, Math.max(1, window.innerWidth / 2));
      const elements = document.elementsFromPoint(probeX, probeY);
      const overDark = elements.some((el) => el.closest?.(".dark-section"));
      setIsOverDark(overDark);
    }, 50);

    window.addEventListener("scroll", throttledHandler);
    window.addEventListener("resize", throttledHandler);
    throttledHandler();

    return () => {
      window.removeEventListener("scroll", throttledHandler);
      window.removeEventListener("resize", throttledHandler);
      throttledHandler.cancel();
    };
  }, []);

  return (
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled && "top-4",
        )}
      >
        <div
          className={cn("transition-all duration-300 nav-surface", {
            "nav-surface-on-dark": isOverDark,
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn("burger-icon transition-all duration-300", {
                "burger-icon--small": isScrolled,
                "burger-icon--open": mobileMenuOpen,
              })}
              aria-hidden="true"
            >
              <line className="burger-line burger-line-1" x1="4" x2="20" y1="6" y2="6" />
              <line className="burger-line burger-line-2" x1="4" x2="20" y1="12" y2="12" />
              <line className="burger-line burger-line-3" x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] mobile-sheet">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <ReactRouterLink to="/" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">sobirAI</span>
                <NavLogo isScrolled={false} />
              </ReactRouterLink>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 flow-root">
            <div className="divide-border -my-6 divide-y">
              <ul className="space-y-2 py-6 mobile-menu-list">
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
  setMobileMenuOpen?: (value: boolean) => void,
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
