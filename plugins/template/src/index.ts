import { logger } from "@vendetta";
import Settings from "./Settings";

const bunny = (window as any).bunny;

export default {
    onLoad: () => {
        logger.log("Hello world!");
        bunny.ui.settings.registerSection({
            name: "Hymmel",
            items: [
                {
                    key: "HYMMEL",
                    title: () => "Hymmel",
                    render: () => import("./Settings"),
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