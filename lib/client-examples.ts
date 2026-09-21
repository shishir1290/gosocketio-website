import { ClientPlatform } from "./clients/types";
import { WEB_MOBILE_PLATFORMS } from "./clients/web-mobile-clients";
import { NATIVE_GAME_PLATFORMS } from "./clients/native-game-clients";

export type { ClientPlatform };

export const CLIENT_PLATFORMS: ClientPlatform[] = [
  ...WEB_MOBILE_PLATFORMS,
  ...NATIVE_GAME_PLATFORMS,
];
