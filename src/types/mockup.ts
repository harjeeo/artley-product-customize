export type Placement = {
  /** Horizontal offset from center, in percent of the print area width (-50 to 50) */
  x: number;
  /** Vertical offset from center, in percent of the print area height (-50 to 50) */
  y: number;
  /** Zoom level applied to the artwork inside the print area */
  scale: number;
};

export type PrintArea = {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Corner rounding applied to the clipped print area, in SVG units */
  rx?: number;
};

export type MockupDefinition = {
  id: string;
  name: string;
  /** Silhouette color used for the placeholder product shape */
  color: string;
  printArea: PrintArea;
};

export type MockupState = MockupDefinition & {
  enabled: boolean;
  placement: Placement;
};

export const DEFAULT_PLACEMENT: Placement = { x: 0, y: 0, scale: 1 };
