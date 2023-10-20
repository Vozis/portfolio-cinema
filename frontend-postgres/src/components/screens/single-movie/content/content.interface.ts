export interface ILink {
  id: number;
  link: string;
  title: string;
}

export interface IContentList {
  name: string;
  links: ILink[];
}
