import React from 'react';
import {
  ActionPanel,
  Detail,
  showToast,
  ToastStyle,
  useNavigation
} from "@raycast/api";
import { getRepoDetails } from './services';
import { NPMPackage } from './entities';


export type PackageDetailsProps = {
  info: NPMPackage;
};


export const PackageDetails: React.FC<PackageDetailsProps> = ({ info }) => {
  const { pop } = useNavigation();
  const [details, setDetails] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      if (info.package.links.repository) {
        let repoDetails = await getRepoDetails(info.package.links.repository);
        if (!repoDetails) {
          pop();
          showToast(ToastStyle.Failure, "Details is not found");
        }
        if (info.flags?.deprecated) {
          repoDetails = `# DEPRECATED: ${info.flags?.deprecated} \n-----\n ${repoDetails}`;
        }
        setDetails(repoDetails);
      }
    })();
  }, [info]);

  return (
    <Detail navigationTitle={`${info.package.name} details`} markdown={details} isLoading={!details}>
      <ActionPanel title="Detail">
        <ActionPanel.Item title="Pop Back" onAction={pop} />
      </ActionPanel>
    </Detail>
  );
}