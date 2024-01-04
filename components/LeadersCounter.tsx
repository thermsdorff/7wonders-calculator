import { BaseCounter } from "./BaseCounter";
import { Game } from "../entities/Game";

export const LeadersCounter = ({ route }) => {
  return <BaseCounter title="Leaders" route={route} type="leaders" />;
};
