import fetch from "node-fetch";


export const getPackageSize = async (packageName: string) => {
	return fetch(`https://bundlephobia.com/api/size?package=${packageName}&record=true`);
}


export const fetchPackages = async (query: string): Promise<Record<string, string>[]> => {
  try {
    const response = await fetch(`https://api.npms.io/v2/search/suggestions?q=${query}`);
    const json = await response.json();
    return json as Record<string, string>[];
  } catch (error) {
    console.error(error);
    showToast(ToastStyle.Failure, "Could not load articles");
    return Promise.resolve([]);
  }
}