import React from "react";
import { ActionPanel, Detail, showToast, Toast, useNavigation } from "@raycast/api";
import { getRepoDetails } from "./services";
import { NPMPackage } from "./entities";
import { PackageActions } from "./PackageActions";

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
          showToast(Toast.Style.Failure, "Details is not found");
        }
        if (info.flags?.deprecated) {
          repoDetails = `# DEPRECATED: ${info.flags?.deprecated} \n-----\n ${repoDetails}`;
        }
        setDetails(repoDetails);
      } else {
        pop();
        showToast(Toast.Style.Failure, "Repository is not found");
      }
    })();
  }, [info]);

  return (
    <Detail
      navigationTitle={`Details: ${info.package.name}`}
      markdown={details}
      isLoading={!details}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Version" text={info.package.version} />
          <Detail.Metadata.Label title="Publisher" text={info.package.publisher.username} />
          {info.package.links.npm && <Detail.Metadata.Link title="NPM" text="NPM" target={info.package.links.npm} />}
          {info.package.links.homepage && (
            <Detail.Metadata.Link title="Homepage" text="Homepage" target={info.package.links.homepage} />
          )}
          {info.package.links.repository && (
            <Detail.Metadata.Link title="Repository" text="Repository" target={info.package.links.repository} />
          )}
          {info.package.links.bugs && (
            <Detail.Metadata.Link title="Bugs" text="Bugs" target={info.package.links.bugs} />
          )}
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Maintainers">
            {info.package.maintainers.map((author) => (
              <Detail.Metadata.TagList.Item key={author.username} text={author.username} />
            ))}
          </Detail.Metadata.TagList>
          <Detail.Metadata.TagList title="Keywords">
            {info.package.keywords.map((keyword) => (
              <Detail.Metadata.TagList.Item key={keyword} text={keyword} />
            ))}
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
    >
      <ActionPanel title="Detail">
        <PackageActions info={info} />
      </ActionPanel>
    </Detail>
  );
};
