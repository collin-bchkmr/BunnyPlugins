import { logger } from "@vendetta";
import Settings from "./Settings";
import { getAssetIDByName } from "@lib/api/assets";
import { registerSection } from "@lib/ui/settings";

export default {
    onLoad: () => {
        logger.log("Hello world!");
        registerSection({
            name: "Hymmel",
            items: [
                {
                    key: "HYMMEL",
                    title: () => "Hymmel",
                    icon: getAssetIDByName("WrenchIcon"),
                    render: () => import("@core/ui/settings/pages/General"),
                    rawTabsConfig: {
                        useTrailing: () => "ABC TEST"
                    }
                }
            ]
        });
    },
    onUnload: () => {
        logger.log("Goodbye, world.");
    },
    settings: Settings,
}