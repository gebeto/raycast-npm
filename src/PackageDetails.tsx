import React from 'react';
import {
  ActionPanel,
  Detail,
  showToast,
  ToastStyle,
  useNavigation
} from "@raycast/api";
import { getRepoDetails } from './services';


export type PackageDetailsProps = {
  title: string,
  repo: string,
};


export const PackageDetails: React.FC<PackageDetailsProps> = (props) => {
  const { pop } = useNavigation();
  const [details, setDetails] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      const repoDetails = await getRepoDetails(props.repo);
      if (!repoDetails) {
        pop();
        showToast(ToastStyle.Failure, "Details is not found");
      }
      setDetails(repoDetails);
    })();
  }, [props.repo]);

  return (
    <Detail navigationTitle={`${props.title} details`} markdown={details} isLoading={!details}>
      <ActionPanel title="Detail">
        <ActionPanel.Item title="Pop Back" onAction={pop} />
      </ActionPanel>
    </Detail>
  );
}