export interface Program {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  coverImage?: string;
  gallery?: string[];
  destination?: string;
  places?: string[];
  highlights?: string[];
  duration?: string;
  priceFrom?: number;
  category?: string;
  featured?: boolean;
  badge?: string;
  order?: number;
  isActive?: boolean;
}

export interface ProgramValueProp {
  title: string;
  description: string;
}
