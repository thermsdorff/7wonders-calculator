import { BaseCounter } from "./BaseCounter";
import { Game } from "../entities/Game";

export const IslandsCounter = ({ route }) => {
  return <BaseCounter title="Iles" route={route} type="islands" />;
};
