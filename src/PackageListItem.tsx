import React from 'react';
import {
  List,
  ActionPanel,
  useNavigation,
  CopyToClipboardAction,
  OpenInBrowserAction,
  showToast,
  ToastStyle,
} from "@raycast/api";
import { PackageDetails } from './PackageDetails';
import { NPMPackage } from './entities';


export type PackagesListItemProps = {
  item: NPMPackage;
};


export const PackagesListItem: React.FC<PackagesListItemProps> = ({ item }) => {
  const { push } = useNavigation();

  return (
    <List.Item
      id={item.package.name}
      title={item.package.name}
      subtitle={item.package.description}
      icon="command-icon.png"
      accessoryTitle={`v${item.package.version}`}
    >
      <ActionPanel>
        <ActionPanel.Item
          title="Details"
          icon="command-icon.png"
          onAction={async () => {
            if (item.package.links.repository) {
              push(<PackageDetails title={item.package.name} repo={item.package.links.repository} />)
            } else {
              showToast(ToastStyle.Failure, "Package repository is not found")
            }
          }}
        />
        {item.package.links.npm && <OpenInBrowserAction title="Open npmjs.org" icon="command-icon.png" url={item.package.links.npm} />}
        {item.package.links.homepage && <OpenInBrowserAction title="Open home page" url={item.package.links.homepage} />}
        {item.package.links.npm && <CopyToClipboardAction shortcut={{ modifiers: ["cmd", "shift"], key: "y" }} title="Copy link" content={item.package.links.npm} />}
        <CopyToClipboardAction shortcut={{ modifiers: ["cmd", "shift"], key: "y" }} title="Copy Yarn" content={`yarn add ${item.package.name}`} />
        <CopyToClipboardAction shortcut={{ modifiers: ["cmd", "shift"], key: "n" }} title="Copy NPM" content={`npm install ${item.package.name}`} />
      </ActionPanel>
    </List.Item>
  );
}
