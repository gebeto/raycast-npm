export type HTMLString = string;
export type SemVer = string;
export type ISOString = string;
export type URL = string;
export type Float = string;
export type Email = string;

export type NPMPackage = {
  package: {
    name: string;
    scope: "unscoped" | string;
    version: SemVer;
    description: string;
    keywords: string[];
    date: ISOString;
    links: {
      npm?: URL;
      homepage?: URL;
      repository?: URL;
      bugs?: URL;
    };
    publisher: {
      username: string;
      email: Email;
    };
    maintainers: {
      username: string;
      email: Email;
    }[];
  };
  score: {
    final: Float;
    detail: {
      quality: Float;
      popularity: Float;
      maintenance: Float;
    };
  };
  searchScore: Float;
  highlight: HTMLString;
};
