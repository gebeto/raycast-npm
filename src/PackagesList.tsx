import React from 'react';
import {
  List,
} from "@raycast/api";
import { fetchPackages } from './services';

import { PackagesListItem } from './PackageListItem';
import { NPMPackage } from './entities';


export const PackagesList = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [items, setItems] = React.useState<NPMPackage[]>([]);

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
        } catch (e) {
          console.error(e);
        }
        setIsLoading(false);
      }}
    >
      {items.map((item) => (
        <PackagesListItem key={item.package.name} item={item} />
      ))}
    </List>
  );
}