export interface ViewableDocument {
  name: string;
  pages: Page[];
}

export interface Page {
  number: number;
  imageUrl: string;
  annotations?: Annotation[];
}

export interface Annotation {
  id: number;
  x: number;
  y: number;
  text: string;
}
