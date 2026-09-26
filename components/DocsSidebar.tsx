"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarMenu } from "./sidebar/SidebarMenu";
import { SidebarGuides } from "./sidebar/SidebarGuides";
import { SidebarSdkList } from "./sidebar/SidebarSdkList";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { scrollToSection } from "@/lib/navigation";

interface DocsSidebarProps {
  onOpenSearch?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function DocsSidebar({ onCloseMobile }: DocsSidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("home");
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const sections = [
      { id: "hero", navId: "home" },
      { id: "steps", navId: "steps" },
      { id: "clients", navId: "clients" },
      { id: "compare", navId: "compare" },
      { id: "architecture", navId: "architecture" },
      { id: "protocol", navId: "protocol" },
      { id: "playground", navId: "playground" },
      { id: "api", navId: "api" },
      { id: "faq", navId: "faq" },
    ];

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.id === "hero") {
          if (window.scrollY < 300) {
            setActiveSection("home");
            break;
          }
        } else {
          const el = document.getElementById(section.id);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(section.navId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    id: string,
    hash: string,
    options?: { stepIndex?: number; platformId?: string }
  ) => {
    setActiveSection(id);
    isClickScrolling.current = true;
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);

    if (onCloseMobile) onCloseMobile();

    scrollToSection(hash || id, {
      stepIndex: options?.stepIndex,
      platformId: options?.platformId,
      onComplete: onCloseMobile,
    });
  };

  return (
    <aside className="w-full h-full flex flex-col justify-between py-5 px-3.5 select-none overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-5">
        <SidebarHeader />
        <SidebarMenu activeSection={activeSection} onLinkClick={handleLinkClick} />
        <SidebarGuides onLinkClick={handleLinkClick} />
        <SidebarSdkList onLinkClick={handleLinkClick} />
      </div>
      <SidebarFooter />
    </aside>
  );
}
