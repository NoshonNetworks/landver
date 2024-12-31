export interface Event {
    keys: string[];
    data: any[];
    transactionIndex: number;
    transactionHash: string;
    blockNumber: number;
  }
  
  export interface Transaction {
    hash: string;
    blockNumber: number;
    transactionIndex: number;
  }
  
  export interface Block {
    events: Event[];
    transactions: Transaction[];
  }
  
  export interface IndexerMessage {
    _tag: "data" | "invalidate";
    data?: Block;
  } 