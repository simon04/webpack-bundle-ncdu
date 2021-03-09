declare namespace webpack {
  export interface Stats {
    modules: Module[];
  }

  export interface Module {
    id: number;
    identifier: string;
    name: string;
    index?: number;
    index2?: number;
    size: number;
    cacheable?: boolean;
    built: boolean;
    optional: boolean;
    prefetched: boolean;
    chunks: number[];
    issuer?: string;
    issuerId?: number;
    issuerName?: string;
    issuerPath?: IssuerPath[];
    failed: boolean;
    errors: number;
    warnings: number;
  }

  export interface IssuerPath {
    id?: number;
    identifier: string;
    name: string;
  }
}
