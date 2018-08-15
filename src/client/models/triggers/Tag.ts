export interface TagTriggerOptions {
    MatchName?: string;
    TrackOpens?: boolean;
}

export interface TagTrigger extends TagTriggerOptions{
    ID: number;
}

export interface TagTriggers {
    TotalCount: number
    Tags: TagTrigger[]
}