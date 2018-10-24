export class TagTriggerOptions {
    constructor(MatchName?: string, TrackOpens?: boolean) {
        this.MatchName = MatchName;
        this.TrackOpens = TrackOpens;
    }

    MatchName?: string;
    TrackOpens?: boolean;
}

export class TagTriggerToCreate extends TagTriggerOptions{
    constructor(MatchName: string, TrackOpens: boolean) {
       super(MatchName, TrackOpens);
    }
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