import { showToast, ToastStyle } from '@raycast/api';
import fetch from "node-fetch";
import { NPMPackage } from './entities';


export const getPackageSize = async (packageName: string) => {
	return fetch(`https://bundlephobia.com/api/size?package=${packageName}&record=true`);
}


const extractor = /\.com\/([\w\W]+)/;
export const getRepoDetails = async (repo: string): Promise<string | undefined> => {
  const name = extractor.exec(repo)?.[1];
  const branches = ["master", "main"];
  for (const branch of branches) {
    let req = await fetch(`https://raw.githubusercontent.com/${name}/${branch}/README.md`);
    if (req.ok) {
      let data = await req.text();
      data = data.replace(/\!\[.+\]\(.+\)/, '');
      return data;
    }
  }
}


export const fetchPackages = async (query: string): Promise<NPMPackage[]> => {
  try {
    const response = await fetch(`https://api.npms.io/v2/search/suggestions?q=${query}`);
    return await response.json() as NPMPackage[];
  } catch (error) {
    console.error(error);
    showToast(ToastStyle.Failure, "Could not load packages");
    return [];
  }
}