import { Game } from "../entities/Game";
import { BaseCounter } from "./BaseCounter";

export const GuildCounter = ({ route }) => {
  return <BaseCounter title="Guilde" route={route} type="guilde" />;
};
