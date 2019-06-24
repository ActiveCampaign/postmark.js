export class UpdateTagTriggerRequest {

    public MatchName?: string;
    public TrackOpens?: boolean;
    constructor(MatchName?: string, TrackOpens?: boolean) {
        this.MatchName = MatchName;
        this.TrackOpens = TrackOpens;
    }
}

export class CreateTagTriggerRequest extends UpdateTagTriggerRequest {
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
