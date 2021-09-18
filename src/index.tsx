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
      subtitle={article.package.description}
      icon="command-icon.png"
      accessoryTitle={`v${article.package.version}`}
    >
      <ActionPanel>
        <OpenInBrowserAction title="Open npmjs.org" icon="command-icon.png" url={article.package.links.npm} />
        <OpenInBrowserAction title="Open home page" url={article.package.links.homepage} />
        <CopyToClipboardAction shortcut={{ modifiers: ["cmd", "shift"], key: "y" }} title="Copy link" content={article.package.links.npm} />
        <CopyToClipboardAction shortcut={{ modifiers: ["cmd", "shift"], key: "y" }} title="Copy Yarn" content={`yarn add ${article.package.name}`} />
        <CopyToClipboardAction shortcut={{ modifiers: ["cmd", "shift"], key: "n" }} title="Copy NPM" content={`npm install ${article.package.name}`} />
      </ActionPanel>
    </List.Item>
  );
}


(async () => {
})();
  render(<PackagesList />);
