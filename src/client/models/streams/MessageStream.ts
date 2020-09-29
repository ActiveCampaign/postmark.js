interface SubscriptionManagementConfiguration {
  UnsubscribeHandlingType: string;
}

export interface MessageStream {
    ID: string;
    ServerID: number;
    Name: string;
    Description: string;
    MessageStreamType: string;
    CreatedAt: string;
    UpdatedAt?: string;
    ArchivedAt?: string;
    ExpectedPurgeDate?: string;
    SubscriptionManagementConfiguration: SubscriptionManagementConfiguration;
}

export interface MessageStreams {
    MessageStreams: MessageStream[];
    TotalCount: number;
}

export interface MessageStreamArchiveResponse {
    ID: number;
    ServerID: number;
    ExpectedPurgeDate: string;
}

export interface MessageStreamUnarchiveResponse {
  ID: string;
  ServerID: number;
  Name: string;
  Description: string;
  MessageStreamType: string;
  CreatedAt: string;
  UpdatedAt?: string;
  ArchivedAt?: null;
  ExpectedPurgeDate?: string;
  SubscriptionManagementConfiguration: SubscriptionManagementConfiguration;
}

export class UpdateMessageStreamRequest {
    public Name?: string;
    public Description?: string;

    public constructor(name?: string, description?: string) {
        this.Name = name;
        this.Description = description;
    }
}

export class CreateMessageStreamRequest {
    public Name: string;
    public Description?: string;
    public ID: string;
    public MessageStreamType: string;

    public constructor(id: string, name: string, messageStreamType: string, description?: string) {
        this.Name = name;
        this.Description = description;
        this.ID = id;
        this.MessageStreamType = messageStreamType;
    }
}
