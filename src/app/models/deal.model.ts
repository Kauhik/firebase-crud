// models/deal.model.ts
export interface Deal {
    id?: string;
    title: string;
    value: number;
    stage: DealStage;
    userId: string;
    createdAt: number;
  }
  
  export type DealStage =
    | 'Prospecting'
    | 'Qualifying'
    | 'Proposing'
    | 'Negotiating'
    | 'Closed Won'
    | 'Closed Lost';
  