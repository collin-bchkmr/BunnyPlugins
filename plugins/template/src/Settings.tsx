import { Forms } from "@vendetta/ui/components";
import { patchSettingsPin } from "$/lib/pinToSettings";

const { FormText } = Forms;

export default (): (() => void) => {
    const patches = [];
    patches.push(
        patchSettingsPin(
            () => true, // Assuming the section should always be shown
            () => <SettingsSection changes="Bunny" />, // Pass "Bunny" for changes
            {
                key: plugin.manifest.name,
                icon: getAssetIDByName(manifest.vendetta.icon),
                trailing: () => {
                    // ... existing trailing logic
                },
                title: () => lang.format("plugin.name", {}),
                page: {
                    render: PluginBrowserPage,
                },
            },
        ),
    );

    return () => patches.forEach((x) => x());
};