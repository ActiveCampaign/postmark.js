export interface TagTriggerOptions {
    MatchName?: string;
    TrackOpens?: boolean;
}

export interface TagTrigger {
    ID: number;
    MatchName: string;
    TrackOpens: boolean;
}

export interface TagTriggers {
    TotalCount: number;
    Tags: TagTrigger[];
}