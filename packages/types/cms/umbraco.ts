export interface UmbracoContent<T = Record<string, any>> {
  id: string;
  contentType: string;
  name: string;
  createDate: string;
  updateDate: string;
  route: {
    path: string;
    startItem: {
      id: string;
      path: string;
    };
  };
  properties: T;
}

export interface UmbracoLink {
  name: string;
  url: string;
  target?: string;
  type?: string; 
}

export interface UmbracoImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface BusinessGuideProps {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  mainIntro?: string;
  mainBody?: {
    markup: string;
    blocks: any[]; // Placeholder for blocks
  };
  hero?: boolean;
  image?: UmbracoImage; // ContextReference equivalent
  timeline?: any[];
  bottomContentArea?: any[];
}

export interface AccordianThemeBlock {
  heading: string;
  themePageArea: UmbracoContent[]; // Resolves to items with url/name
  goToLinkLocation?: UmbracoLink;
  goToLinkText?: string;
  image?: UmbracoImage;
}

export interface SectionPageProps {
  heading: string;
  themePageArea?: UmbracoContent[]; // Featured list in header
  goToLinkLocation?: UmbracoLink;
  goToLinkText?: string;
  themeArea?: {
    contentData: AccordianThemeBlock[]; 
  };
  bottomArea?: any[];
  backgroundImage?: UmbracoImage;
}

export type BusinessGuidePage = UmbracoContent<BusinessGuideProps>;
export type SectionPage = UmbracoContent<SectionPageProps>;

