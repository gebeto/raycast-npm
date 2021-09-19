import React from 'react';
import {
  ActionPanel,
  Detail,
  showToast,
  ToastStyle,
  useNavigation,
} from "@raycast/api";
import { getRepoDetails } from './services';
import { NPMPackage } from './entities';
import { PackageActions } from './PackageActions';


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
      } else {
        pop();
        showToast(ToastStyle.Failure, "Repository is not found");
      }
    })();
  }, [info]);

  return (
    <Detail navigationTitle={`Details: ${info.package.name}`} markdown={details} isLoading={!details}>
      <ActionPanel title="Detail">
        <PackageActions info={info} />
      </ActionPanel>
    </Detail>
  );
}