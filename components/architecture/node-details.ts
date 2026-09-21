import { NODE_DETAILS_CORE } from "./node-details-core";
import { NODE_DETAILS_SIO } from "./node-details-sio";

export const NODE_DETAILS = {
  ...NODE_DETAILS_CORE,
  ...NODE_DETAILS_SIO,
};
