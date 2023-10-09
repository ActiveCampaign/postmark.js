export enum DataRemovalStatusTypes {
    Pending= "Pending",
    Done = "Done"
}

export interface DataRemovalStatus {
    ID: number;
    Status: DataRemovalStatusTypes;
}


export class DataRemovalRequest {
    public RequestedBy: string;
    public RequestedFor: string;
    public NotifyWhenCompleted: boolean;

    public constructor(requestedBy: string, requestedFor: string, notifyWhenCompleted: boolean) {
        this.RequestedBy = requestedBy
        this.RequestedFor = requestedFor;
        this.NotifyWhenCompleted = notifyWhenCompleted
    }
}