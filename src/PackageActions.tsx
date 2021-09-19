import {
  OpenInBrowserAction,
  CopyToClipboardAction,
  PasteAction,
  ActionPanel,
  Icon,
} from '@raycast/api';
import { NPMPackage } from './entities';


export type PackageActionsProps = {
  info: NPMPackage;
}


export const PackageActions: React.FC<PackageActionsProps> = ({ info }) => {
  return (
    <>
      <ActionPanel.Section title="Info">
        {info.package.links.npm && <OpenInBrowserAction title="Open npmjs.org" url={info.package.links.npm} />}
        {info.package.links.homepage && <OpenInBrowserAction title="Open home page" url={info.package.links.homepage} />}
        {info.package.links.npm && <CopyToClipboardAction shortcut={{ modifiers: ["cmd", "shift"], key: "l" }} title="Copy npmjs.org link" content={info.package.links.npm} />}
      </ActionPanel.Section>
      <ActionPanel.Section title="Install">
        <PasteAction icon={Icon.Terminal} shortcut={{ modifiers: ["cmd", "shift"], key: "y" }} title="Paste Install Yarn" content={`yarn add ${info.package.name}`} />
        <PasteAction icon={Icon.Terminal} shortcut={{ modifiers: ["cmd", "shift"], key: "n" }} title="Paste Install NPM" content={`npm install ${info.package.name}`} />
        <PasteAction icon={Icon.Terminal} title="Paste Install global Yarn" content={`yarn global add ${info.package.name}`} />
        <PasteAction icon={Icon.Terminal} title="Paste Install global NPM" content={`npm install -g ${info.package.name}`} />
      </ActionPanel.Section>
    </>
  );
};