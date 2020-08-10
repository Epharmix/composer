export interface TreeNodeSource {
  ROOT?: boolean;
  REPLY: string;
}

export interface TreeLinkSource {
  FROM: string;
  TO: string;
  STORE?: string;
  WHEN?: {
    TYPE: 'NUMBER';
    MAX?: string;
    MAX_INCLUSIVE?: boolean;
    MIN?: string;
    MIN_INCLUSIVE?: boolean;
  };
  ON_EXP?: string;
}

export interface TreeSource {
  CONSTS: {
    [key: string]: number | boolean | string;
  };
  NODES: {
    [key: string]: TreeNodeSource;
  };
  LINKS: any[];
}
