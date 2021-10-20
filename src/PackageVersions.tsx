import React from 'react';
import {
  showToast,
  ToastStyle,
  useNavigation,
  ActionPanel,
  CopyToClipboardAction,
  List,
} from "@raycast/api";
import { getPackageAllDetails } from './services';
import { NPMPackage } from './entities';
import { AssetIcon } from './AssetIcon';


export type PackageVersionsProps = {
  info: NPMPackage;
};


export const PackageVersions: React.FC<PackageVersionsProps> = ({ info }) => {
  const { pop } = useNavigation();
  const [details, setDetails] = React.useState<any>();

  const versions = details?.versions;

  const versionsKeys = React.useMemo(() => {
    return versions ? Object.keys(versions).reverse() : [];
  }, [versions]);

  const currVersions = React.useMemo(() => {
    const tags = details?.['dist-tags'];
    return tags ? Object.keys(tags).map(ver => ({ title: ver, subtitle: tags[ver] })) : [];
  }, [details]);

  React.useEffect(() => {
    (async () => {
      let repoDetails = await getPackageAllDetails(info.package.name);
      if (!repoDetails) {
        pop();
        showToast(ToastStyle.Failure, "Details is not found");
      }
      setDetails(repoDetails as any);
    })();
  }, [info]);

  return (
    <List navigationTitle={`Versions: ${info.package.name}`} isLoading={!details}>
      <List.Section title="Current versions">
        {currVersions.map(version =>
          <List.Item
            icon={AssetIcon.npm}
            title={version.title}
            accessoryTitle={version.subtitle}
            actions={
              <ActionPanel>
                <CopyToClipboardAction title="Copy package version tag" content={`${info.package.name}@${version.title}`} />
                <CopyToClipboardAction title="Copy package version" content={`${info.package.name}@${version.subtitle}`} />
              </ActionPanel>
            }
          />
        )}
      </List.Section>
      <List.Section title="Old versions">
        {versionsKeys.map(version =>
          <List.Item
            icon={AssetIcon.npm}
            title={version}
            accessoryTitle={versions?.[version].name}
            actions={
              <ActionPanel>
                <CopyToClipboardAction title="Copy package version name" content={`${info.package.name}@${version}`} />
              </ActionPanel>
            }
          />
        )}
      </List.Section>
    </List>
  );
};
