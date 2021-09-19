import {
  OpenInBrowserAction,
  CopyToClipboardAction,
  PasteAction,
  ActionPanel,
  Icon,
  Color,
} from '@raycast/api';
import { NPMPackage } from './entities';


export type PackageActionsProps = {
  info: NPMPackage;
}


export const TerminalIconYarn = {
  source: Icon.Terminal,
  tintColor: Color.Blue,
};


export const TerminalIconNpm = {
  source: Icon.Terminal,
  tintColor: Color.Red,
};


export const PackageActions: React.FC<PackageActionsProps> = ({ info }) => {
  return (
    <>
      <ActionPanel.Submenu title="Links" icon={Icon.Globe} shortcut={{ modifiers: ["cmd"], key: "l" }}>
        {info.package.links.npm && <OpenInBrowserAction title="Open npmjs.org" url={info.package.links.npm} />}
        {info.package.links.homepage && <OpenInBrowserAction title="Open home page" url={info.package.links.homepage} />}
        {info.package.links.npm && <CopyToClipboardAction title="Copy npmjs.org link" content={info.package.links.npm} />}
      </ActionPanel.Submenu>
      <ActionPanel.Submenu title="Install Yarn" icon={TerminalIconYarn} shortcut={{ modifiers: ["cmd"], key: "y" }}>
        <PasteAction icon={TerminalIconYarn} title="Paste Install Yarn" content={`yarn add ${info.package.name}`} />
        <PasteAction icon={TerminalIconYarn} title="Paste Install global Yarn" content={`yarn global add ${info.package.name}`} />
      </ActionPanel.Submenu>
      <ActionPanel.Submenu title="Install NPM" icon={TerminalIconNpm} shortcut={{ modifiers: ["cmd"], key: "n" }}>
        <PasteAction icon={TerminalIconNpm} title="Paste Install NPM" content={`npm install ${info.package.name}`} />
        <PasteAction icon={TerminalIconNpm} title="Paste Install global NPM" content={`npm install -g ${info.package.name}`} />
      </ActionPanel.Submenu>
    </>
  );
};