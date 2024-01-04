import { BaseCounter } from "./BaseCounter";
import { Game } from "../entities/Game";

export const CivilCounter = ({ route }) => {
  return <BaseCounter title="Civil" route={route} type="civil" />;
};
