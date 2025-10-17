"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface NavigationWrapperProps {
  children: ReactNode;
}

export default function NavigationWrapper({
  children,
}: NavigationWrapperProps) {
  const pathname = usePathname();
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    const checkShouldHide = () => {
      // Define known routes that should show navigation
      const knownRoutes = [
        "/",
        "/about",
        "/rooms",
        "/amenities",
        "/gallery",
        "/contact",
      ];

      // If current path is not in known routes, it's likely a 404 page
      if (pathname && !knownRoutes.includes(pathname)) {
        setShouldHide(true);
      } else {
        // We're on a known route, show navigation
        setShouldHide(false);
      }
    };

    checkShouldHide();
  }, [pathname]);

  if (shouldHide) {
    return null;
  }

  return <>{children}</>;
}
