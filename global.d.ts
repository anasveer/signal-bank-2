// src/types/wistia.d.ts  OR  global.d.ts

import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "media-id"?: string;
        aspect?: string;
      };
    }
  }
}

export {};