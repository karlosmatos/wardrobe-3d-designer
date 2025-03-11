export type WardrobeType = 'standard' | 'corner' | 'sliding' | 'walk-in';

export type Material = {
  id: string;
  name: string;
  color: string;
  texture?: string;
  price: number;
};

export type WardrobeDimensions = {
  width: number;
  height: number;
  depth: number;
};

export type WardrobeComponent = {
  id: string;
  type: 'shelf' | 'drawer' | 'rail' | 'door' | 'divider' | 'shoe_rack' | 'trouser_rack' | 'tie_rack' | 'mirror' | 'lighting' | 'jewelry_tray' | 'pull_out';
  position: {
    x: number;
    y: number;
    z: number;
  };
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  material: string; // Material ID
  rotation?: {
    x: number;
    y: number;
    z: number;
  };
};

export type WardrobeConfiguration = {
  id: string;
  type: WardrobeType;
  dimensions: WardrobeDimensions;
  components: WardrobeComponent[];
  materials: {
    body: string; // Material ID
    doors: string; // Material ID
    handles: string; // Material ID
  };
  price: number;
}; 