import { List } from "react-native-paper";
import { CustomSwitch } from "../components/Switch";

export const Settings = () => {
  return (
    <List.Section>
      <List.Subheader>Extensions</List.Subheader>
      <List.Item title="Cities" right={() => <CustomSwitch />} />
      <List.Item title="Leaders" right={() => <CustomSwitch />} />
      <List.Item title="Edifice" right={() => <CustomSwitch />} />
      <List.Item title="Armada" right={() => <CustomSwitch />} />
    </List.Section>
  );
};
