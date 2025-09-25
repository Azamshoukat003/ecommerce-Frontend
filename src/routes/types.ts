// src/routes/types.ts
import { ComponentType } from "react";

export interface RouteItem {
  path: string;
  Content: ComponentType;
}
