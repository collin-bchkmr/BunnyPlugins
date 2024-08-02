import { logger } from "@vendetta";
import Settings from "./Settings";
import { registerSection } from "$lib/ui/settings";

export default {
    onLoad: () => {
        logger.log("Hello world!");
        registerSection({
            name: "Hymmel",
            items: [
                {
                    key: "HYMMEL",
                    title: () => "Hymmel",
                    render: () => Settings,
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