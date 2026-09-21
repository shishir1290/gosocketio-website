export interface ComparisonFeature {
  name: string;
  gsocketio: string | boolean;
  legacySocketIo: string | boolean;
  gorillaWs: string | boolean;
  rawNetHttp: string | boolean;
  highlight?: boolean;
}

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    name: "Socket.IO Protocol Version",
    gsocketio: "v4 / v5 (Latest)",
    legacySocketIo: "v1 / v2 (Deprecated)",
    gorillaWs: "None (Raw WS only)",
    rawNetHttp: "None (HTTP only)",
    highlight: true,
  },
  {
    name: "Zero 3rd-Party Dependencies",
    gsocketio: true,
    legacySocketIo: false,
    gorillaWs: false,
    rawNetHttp: true,
    highlight: true,
  },
  {
    name: "Engine.IO Long-Polling Fallback",
    gsocketio: true,
    legacySocketIo: true,
    gorillaWs: false,
    rawNetHttp: false,
  },
  {
    name: "Seamless Transport Upgrade (HTTP → WS)",
    gsocketio: true,
    legacySocketIo: false,
    gorillaWs: false,
    rawNetHttp: false,
    highlight: true,
  },
  {
    name: "Built-in Room & Namespace Hub",
    gsocketio: true,
    legacySocketIo: true,
    gorillaWs: false,
    rawNetHttp: false,
  },
  {
    name: "Native Binary 0x02 Zero-Transcode",
    gsocketio: true,
    legacySocketIo: false,
    gorillaWs: true,
    rawNetHttp: false,
  },
  {
    name: "Concurrent Fan-Out Latency",
    gsocketio: "< 0.2ms",
    legacySocketIo: "~ 4.5ms",
    gorillaWs: "~ 0.8ms",
    rawNetHttp: "N/A",
    highlight: true,
  },
  {
    name: "Standard net/http Integration",
    gsocketio: true,
    legacySocketIo: false,
    gorillaWs: true,
    rawNetHttp: true,
  },
];
