import React from 'react';
import {
  ActionPanel,
  CopyToClipboardAction,
  List,
  OpenInBrowserAction,
  render,
  showToast,
  ToastStyle,
} from "@raycast/api";
import fetch from "node-fetch";


async function fetchPackages(query: string): Promise<Record<string, string>[]> {
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

function PackagesList(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);

  return (
    <List
      searchBarPlaceholder="Filter packages by name..."
      navigationTitle="Search"
      isLoading={isLoading}
      throttle

      onSearchTextChange={async (text) => {
        setIsLoading(true);
        const result = await fetchPackages(text);
        console.log(' RED', result);
        setItems(result.length ? result : []);
        setIsLoading(false);
      }}
     >
      {items.map((article) => (
        <PackagesListItem key={article.package.name} article={article} />
      ))}
    </List>
  );
}

function PackagesListItem(props: { article: Record<string, string> }) {
  const article = props.article;
  return (
    <List.Item
      id={article.package.name}
      title={article.package.name}
      subtitle="NPM"
      icon="list-icon-red.png"
      accessoryTitle={new Date(article.package.date).toLocaleDateString()}
    >
      <ActionPanel>
        <OpenInBrowserAction url={article.package.links.npm} />
        <CopyToClipboardAction title="Copy URL" content={article.package.links.npm} />
      </ActionPanel>
    </List.Item>
  );
}


(async () => {
})();
  render(<PackagesList />);
