export interface SearchItem {
  id: string;
  title: string;
  category: "Overview" | "Guides" | "Client SDKs" | "API Reference" | "Protocol" | "Community";
  description: string;
  href: string;
  keywords: string[];
  badge?: string;
  isExternal?: boolean;
}
