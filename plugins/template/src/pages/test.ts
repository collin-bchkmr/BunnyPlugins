import { Stack, TableRow, TableRowGroup } from "@vendetta/ui/components/discord/Redesign";
import { ScrollView } from "react-native";

export default function test() {
    return (
        <ScrollView>
            <Stack>
                <TableRowGroup title={"ABC"}>
                    <TableRow
                        label={"TEST"}
                        trailing={<TableRow.TrailingText text={"BHABJ"} />}
                    />
                </TableRowGroup>
            </Stack>
        </ScrollView>
    );
}