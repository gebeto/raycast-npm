import React from 'react';
import {
  Detail,
  showToast,
  ToastStyle,
  useNavigation,
} from "@raycast/api";
import { getRepoLicense } from './services';
import { NPMPackage } from './entities';


export type PackageLicenseProps = {
  info: NPMPackage;
};


export const PackageLicense: React.FC<PackageLicenseProps> = ({ info }) => {
  const { pop } = useNavigation();
  const [license, setLicense] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      if (info.package.links.repository) {
        let repoLicense = await getRepoLicense(info.package.links.repository);
        if (!repoLicense) {
          pop();
          showToast(ToastStyle.Failure, "License is not found");
        }
        setLicense(repoLicense);
      } else {
        pop();
        showToast(ToastStyle.Failure, "Repository is not found");
      }
    })();
  }, [info]);

  return (
    <Detail
      navigationTitle={`License: ${info.package.name}`}
      markdown={license}
      isLoading={!license}
    />
  );
}