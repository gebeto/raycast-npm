export type SemVer = string;
export type ISOString = string;
export type URL = string;

export type NPMPackage = {
  package: {
    name: string,
    scope: string,
    version: SemVer,
    description: string;
    keywords: string[];
    date: ISOString,
    links: {
      npm?: URL;
      homepage?: URL;
      repository?: URL;
      bugs?: URL;
    };
    publisher: {
      username: string;
      email: string;
    };
  }
};