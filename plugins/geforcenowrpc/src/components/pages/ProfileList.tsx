import {
  clipboard,
  NavigationNative,
  React,
  ReactNative as RN,
} from "@vendetta/metro/common";
import { showConfirmationAlert, showInputAlert } from "@vendetta/ui/alerts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms, Search } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";

import { hideActionSheet } from "$/components/ActionSheet";
import SuperAwesomeIcon from "$/components/SuperAwesomeIcon";

import { vstorage } from "../..";
import {
  makeEmptySettingsActivity,
  SettingsActivity,
} from "../../stuff/activity";
import { activitySavedPrompt } from "../../stuff/prompts";
import { forceUpdateSettings } from "../Settings";

const { FormRadioRow, FormRow } = Forms;

import { showSimpleActionSheet } from "$/components/ActionSheet";

const headerRightCallbacks: {
  import?: () => void;
  add?: () => void;
} = {
  import: undefined,
  add: undefined,
};

export const ProfileList = () => {
  const navigation = NavigationNative.useNavigation();
  const [_, forceUpdate] = React.useReducer((x) => ~x, 0);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    setSearch("");
  }, []);

  headerRightCallbacks.add = () =>
    showInputAlert({
      title: "Enter new profile name",
      placeholder: "Super Awesome RPC",
      confirmText: "Add",
      confirmColor: "brand" as ButtonColors,
      onConfirm: (txt) => {
        if (txt.match(/^\s*$/))
          return showToast(
            "Profile name cannot be empty",
            getAssetIDByName("Small"),
          );
        txt = txt.trim();

        if (vstorage.profiles[txt])
          return showToast(
            "A profile with that name already exists",
            getAssetIDByName("Small"),
          );

        vstorage.profiles[txt] = JSON.parse(
          JSON.stringify(vstorage.activity.editing),
        );
        vstorage.activity.profile = txt;
        forceUpdate();
        showToast("Created profile", getAssetIDByName("Check"));
      },
      cancelText: "Cancel",
    });
  headerRightCallbacks.import = async () => {
    let activity: SettingsActivity;
    try {
      activity = JSON.parse(await clipboard.getString());
    } catch {
      return showToast("Failed to parse JSON");
    }

    const data = SettingsActivity.validate(activity);
    if (data.error)
      return showToast("Invalid profile data", getAssetIDByName("Small"));

    let counter = 0,
      name = "Imported Profile";
    while (vstorage.profiles[name]) {
      counter++;
      name = `Imported Profile (${counter})`;
    }

    vstorage.profiles[name] = data.value as SettingsActivity;
    vstorage.activity.profile = name;
    forceUpdate();
    showToast("Imported profile", getAssetIDByName("Check"));
  };

  let wentBack = false;

  return (
    <RN.FlatList
      ListHeaderComponent={
        <Search
          style={{ marginBottom: 10 }}
          onChangeText={(txt: string) => setSearch(txt.toLowerCase())}
        />
      }
      style={{ paddingHorizontal: 10, paddingTop: 10 }}
      contentContainerStyle={{ paddingBottom: 20 }}
      data={Object.keys(vstorage.profiles).filter((x) =>
        x.toLowerCase().includes(search),
      )}
      renderItem={({ item }) => (
        <FormRadioRow
          label={item}
          onLongPress={() =>
            showSimpleActionSheet({
              key: "CardOverflow",
              header: {
                title: item,
                onClose: () => hideActionSheet(),
              },
              options: [
                {
                  label: "Copy Profile",
                  icon: getAssetIDByName("copy"),
                  onPress: () => {
                    clipboard.setString(
                      JSON.stringify(vstorage.profiles[item], undefined, 3),
                    );
                    showToast("Copied", getAssetIDByName("toast_copy_link"));
                  },
                },
                {
                  label: "Rename Profile",
                  icon: getAssetIDByName("ic_message_edit"),
                  onPress: () =>
                    showInputAlert({
                      title: "Enter new profile name",
                      placeholder: "Super Awesome RPC 2.0",
                      initialValue: item,
                      confirmText: "Rename",
                      confirmColor: "brand" as ButtonColors,
                      onConfirm: function (txt) {
                        if (txt.match(/^\s*$/))
                          return showToast(
                            "Profile name cannot be empty",
                            getAssetIDByName("Small"),
                          );
                        txt = txt.trim();

                        if (vstorage.profiles[txt])
                          return showToast(
                            "A profile with that name already exists",
                            getAssetIDByName("Small"),
                          );

                        vstorage.profiles[txt] = vstorage.profiles[item];
                        if (vstorage.activity.profile === item)
                          vstorage.activity.profile = txt;
                        delete vstorage.profiles[item];
                        forceUpdate();

                        showToast("Renamed profile", getAssetIDByName("Check"));
                      },
                      cancelText: "Cancel",
                    }),
                },
                {
                  label: "Delete Profile",
                  icon: getAssetIDByName("trash"),
                  isDestructive: true,
                  onPress: () =>
                    showConfirmationAlert({
                      title: "Delete Profile",
                      content:
                        "Are you sure you want to delete this profile? This cannot be undone.",
                      confirmText: "Delete",
                      confirmColor: "red" as ButtonColors,
                      onConfirm: function () {
                        if (vstorage.activity.profile === item) {
                          delete vstorage.activity.profile;
                          vstorage.activity.editing =
                            makeEmptySettingsActivity();
                        }

                        delete vstorage.profiles[item];
                        forceUpdate();
                        forceUpdateSettings?.();
                        showToast("Deleted", getAssetIDByName("Check"));
                      },
                      cancelText: "Cancel",
                    }),
                },
              ],
            })
          }
          onPress={() => {
            if (wentBack) return;
            if (vstorage.activity.profile === item)
              return showToast(
                `${item} is already loaded`,
                getAssetIDByName("Small"),
              );
            activitySavedPrompt({
              role: "discard your changes",
              button: "Discard",
              run: () => {
                vstorage.activity.editing = JSON.parse(
                  JSON.stringify(vstorage.profiles[item]),
                );
                vstorage.activity.profile = item;

                wentBack = true;
                navigation.goBack();
                forceUpdateSettings?.();
                showToast("Loaded", getAssetIDByName("Check"));
              },
              secondaryButton: "Save profile",
              secondaryRun: () => {
                vstorage.profiles[vstorage.activity.profile] = JSON.parse(
                  JSON.stringify(vstorage.activity.editing),
                );
              },
            });
          }}
          trailing={<FormRow.Arrow />}
          selected={vstorage.activity.profile === item}
        />
      )}
    />
  );
};

export function showProfileList(navigation: any) {
  navigation.push("VendettaCustomPage", {
    render: ProfileList,
    title: "Profiles",
    headerRight: () => (
      <RN.View style={{ flexDirection: "row-reverse" }}>
        <SuperAwesomeIcon
          style="header"
          icon={getAssetIDByName("ic_add_24px")}
          onPress={() => headerRightCallbacks.add?.()}
        />
        <SuperAwesomeIcon
          style="header"
          icon={getAssetIDByName("ic_file_upload_24px")}
          onPress={() => headerRightCallbacks.import?.()}
        />
      </RN.View>
    ),
  });
}
