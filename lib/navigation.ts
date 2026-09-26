export interface ScrollOptions {
  stepIndex?: number;
  platformId?: string;
  onComplete?: () => void;
}

export function scrollToSection(
  targetIdOrHash: string,
  options?: ScrollOptions
) {
  if (typeof window === "undefined") return;

  const cleanId = targetIdOrHash.replace(/^#/, "").trim();

  // If selecting a guide step
  if (options?.stepIndex !== undefined) {
    window.dispatchEvent(
      new CustomEvent("select-guide-step", {
        detail: { stepIndex: options.stepIndex },
      })
    );
  }

  // If selecting a client platform SDK
  if (options?.platformId) {
    window.dispatchEvent(
      new CustomEvent("select-client-sdk", {
        detail: { platformId: options.platformId },
      })
    );
  }

  if (options?.onComplete) {
    options.onComplete();
  }

  // Handle scrolling to top
  if (!cleanId || cleanId === "home" || cleanId === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    return;
  }

  const element = document.getElementById(cleanId);
  if (element) {
    const navbarOffset = 75; // Offset for sticky navbar header (64px) + margin
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${cleanId}`);
  }
}
