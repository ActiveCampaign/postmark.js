
export enum UnsubscribeHandlingTypes {
  None = "None",
  Postmark = "Postmark",
  Custom = "Custom",
}

export interface SubscriptionManagementConfiguration {
  UnsubscribeHandlingType: UnsubscribeHandlingTypes;
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
    public SubscriptionManagementConfiguration?: SubscriptionManagementConfiguration;

    public constructor(name?: string, description?: string, subscriptionManagementConfiguration?: SubscriptionManagementConfiguration) {
        this.Name = name;
        this.Description = description;
        this.SubscriptionManagementConfiguration = subscriptionManagementConfiguration;
    }
}

export class CreateMessageStreamRequest {
    public ID: string;
    public Name: string;
    public MessageStreamType: string;
    public Description?: string;
    public SubscriptionManagementConfiguration?: SubscriptionManagementConfiguration;

    public constructor(id: string, name: string, messageStreamType: string, description?: string,
                       subscriptionManagementConfiguration?: SubscriptionManagementConfiguration) {
        this.Name = name;
        this.Description = description;
        this.ID = id;
        this.MessageStreamType = messageStreamType;
        this.SubscriptionManagementConfiguration = subscriptionManagementConfiguration;
    }
}
