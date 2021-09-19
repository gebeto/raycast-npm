import React from 'react';
import {
  List,
  ActionPanel,
  useNavigation,
  showToast,
  ToastStyle,
} from "@raycast/api";
import { PackageDetails } from './PackageDetails';
import { NPMPackage } from './entities';
import { PackageActions } from './PackageActions';
import { PackageLicense } from './PackageLicense';


export type PackagesListItemProps = {
  item: NPMPackage;
};


export const PackagesListItem: React.FC<PackagesListItemProps> = ({ item }) => {
  const { push } = useNavigation();

  const accessory = React.useMemo(() => {
    if (item.flags?.deprecated) {
      return `DEPRECATED | v${item.package.version}`
    }
    return `v${item.package.version}`
  }, [item.package]);

  const icon = React.useMemo(() => {
    if (item.flags?.deprecated) {
      return "npm-warn.png";
    }
    return "npm.png";
  }, [item.package])

  return (
    <List.Item
      id={item.package.name}
      title={item.package.name}
      subtitle={item.package.description}
      icon={icon}
      accessoryTitle={accessory}
    >
      <ActionPanel>
        <ActionPanel.Item
          title="Details"
          icon={icon}
          onAction={async () => {
            if (item.package.links.repository) {
              push(<PackageDetails info={item} />)
            } else {
              showToast(ToastStyle.Failure, "Package repository is not found")
            }
          }}
        />
        <PackageActions info={item} />
      </ActionPanel>
    </List.Item>
  );
}
