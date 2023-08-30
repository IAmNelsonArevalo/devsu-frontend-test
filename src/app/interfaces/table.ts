export interface Headings {
  logo: string;
  name: string;
  description: string;
  date_release: string;
  date_revision: string;
  [key: string]: string ;
}

export interface Product extends Headings {
  id: string;
}

export interface Table {
}
