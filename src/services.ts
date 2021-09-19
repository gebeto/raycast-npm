import { showToast, ToastStyle } from '@raycast/api';
import fetch from "node-fetch";
import { NPMPackage } from './entities';

import base64 from 'base-64';


export const repoNameExtractor = /\.com\/([\w\W]+)/;
export const getRepoName = (url: string): string | undefined => repoNameExtractor.exec(url)?.[1];


export const simpleFetchText = async (url: string, options?: Parameters<typeof fetch>[1]): Promise<string> => {
  return await (await fetch(url)).text();
}


export const simpleFetchJSON = async (url: string, options?: Parameters<typeof fetch>[1]): Promise<any> => {
  return await (await fetch(url)).json();
}


export const getPackageSize = async (packageName: string) => {
	return fetch(`https://bundlephobia.com/api/size?package=${packageName}&record=true`);
}


export const getRepoDetails = async (repo: string): Promise<string | undefined> => {
  const name = getRepoName(repo);
  const readmeInfo = await simpleFetchJSON(`https://api.github.com/repos/${name}/readme`);
  let content = base64.decode(readmeInfo.content);
  content = content.replace(/\!\[.+?\][\(\[].+?[\)\]]/g, '');
  return content;
}


export const getRepoLicense = async (repo: string): Promise<string | undefined> => {
  const name = getRepoName(repo);
  const licenseInfo = await simpleFetchJSON(`https://api.github.com/repos/${name}/license`);
  const content = base64.decode(licenseInfo.content);
  return content;
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