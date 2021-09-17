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
import { fetchPackages } from './services';


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
        try {
          if (text) {
            const result = await fetchPackages(text);
            setItems(result);
          } else {
            setItems([]);
          }
        } catch(e) {
          console.error(e);
        }
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
        <CopyToClipboardAction shortcut={{ modifiers: ["cmd", "shift"], key: "y" }} title="Copy Yarn" content={`yarn add ${article.package.name}`} />
        <CopyToClipboardAction shortcut={{ modifiers: ["cmd", "shift"], key: "n" }} title="Copy NPM" content={`npm install ${article.package.name}`} />
      </ActionPanel>
    </List.Item>
  );
}


(async () => {
})();
  render(<PackagesList />);
