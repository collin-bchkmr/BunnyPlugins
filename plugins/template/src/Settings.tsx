import {
    clipboard,
    NavigationNative,
    React,
    ReactNative as RN,
  } from "@vendetta/metro/common";
  import { useProxy } from "@vendetta/storage";
  import { showConfirmationAlert } from "@vendetta/ui/alerts";
  import { getAssetIDByName } from "@vendetta/ui/assets";
  import { Forms } from "@vendetta/ui/components";
  import { showToast } from "@vendetta/ui/toasts";
  import { BetterTableRowGroup } from "./lib/components/BetterTableRow";
  
  const { FormSwitchRow, FormIcon, FormRow } = Forms;
  
  export default () => {
    return (
      <>
        <RN.ScrollView
          style={{
            zIndex: 1,
          }}
        >
          <BetterTableRowGroup
            title="TEEEEEEEEEEEE"
          >
          </BetterTableRowGroup>
          <BetterTableRowGroup
            title="Settings"
          >
            <FormSwitchRow
              label="WEEWEE Mode"
              subLabel="UWU"
              value={"vstorage.settings.edit"}
            />
          </BetterTableRowGroup>
        </RN.ScrollView>
      </>
    );
  };