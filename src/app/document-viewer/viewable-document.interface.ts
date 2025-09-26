export interface ViewableDocument {
  name: string;
  pages: Page[];
}

export interface Page {
  number: number;
  imageUrl: string;
}
