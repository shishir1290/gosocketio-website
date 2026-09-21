export interface DocStep {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  summary: string;
  code: string;
  filename: string;
  language: string;
  highlights: string[];
  tips?: string[];
}

export interface ApiReferenceCategory {
  category: string;
  items: Array<{
    name: string;
    desc: string;
  }>;
}
