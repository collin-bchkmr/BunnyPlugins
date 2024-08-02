import { Stack, TableRow, TableRowGroup } from "@vendetta/ui/components";
import { ScrollView } from "react-native";

export default function test() {
    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <Stack style={{ paddingVertical: 24, paddingHorizontal: 12 }} spacing={24}>
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