import { HttpMethod } from './SupportingTypes';
import PostmarkMessage from './PostmarkMessage';
import PostmarkResponse from './PostmarkResponse';
import PostmarkError from './PostmarkError';
import TemplatedPostmarkMessage from './TemplatedPostmarkMessage';
import IClientOptions from './IClientOptions';
import StatisticsOverviewResponse from './StatisticsOverviewResponse';

import Bounces from './bounces/Bounces';
import Bounce from './bounces/Bounce';
import BounceDump from './bounces/BounceDump';
import BounceActivateResponse from './bounces/BounceActivateResponse';
import DeliveryStats from './bounces/DeliveryStats';


import Server from './Server';

import IServerOptions from './IServerOptions';
import OutboundMessageDetails, { OutboundMessageDetailsExtended } from './OutboundMessageDetails';
import OutboundMessageDetailSearchResponse from './OutboundMessageDetailSearchResponse';
import MessageOpensResponse from './MessageOpensResponse';
import MessageClicksRequest from './MessageClicksRequest';
import MessageClicksResponse from './MessageClicksResponse';
import SingleMessageClicksRequest from './SingleMessageClicksRequest';
import SingleMessageClicksResponse from './SingleMessageClicksResponse';
import SingleMessageOpensRequest from './SingleMessageOpensRequest';
import SingleMessageOpensResponse from './SingleMessageOpensResponse';
import MessageOpensRequest from './MessageOpensRequest';
import InboundMessageSearchRequest from './InboundMessageSearchRequest';
import InboundMessageSearchResponse from './InboundMessageSearchResponse';
import InboundMessageDetails from './InboundMessageDetails';
import InboundBypassResponse from './InboundBypassResponse';
import InboundRetryResponse from './InboundRetryResponse';
import StatisticsOverviewRequest from './StatisticsOverviewRequest';
import SentCountsResponse from './SentCountsResponse';
import SentCountsRequest from './SentCountsRequest';
import BounceCountsRequest from './BounceCountsRequest';
import BounceCountsResponse from './BounceCountsResponse';
import SpamComplaintsResponse from './SpamComplaintsResponse';
import SpamComplaintsRequest from './SpamComplaintsRequest';
import TrackedEmailCountsRequest from './TrackedEmailCountsRequest';
import TrackedEmailCountsResponse from './TrackedEmailCountsResponse';
import EmailOpenCountsResponse from './EmailOpenCountsResponse';
import EmailOpenCountsRequest from './EmailOpenCountsRequest';
import EmailPlatformUsageRequest from './EmailPlatformUsageRequest';
import EmailPlatformUsageResponse from './EmailPlatformUsageResponse';
import EmailClientUsageRequest from './EmailClientUsageRequest';
import EmailClientUsageResponse from './EmailClientUsageResponse';
import EmailReadTimesRequest from './EmailReadTimesRequest';
import EmailReadTimesResponse from './EmailReadTimesResponse';
import ClickCountsResponse from './ClickCountsResponse';
import ClickCountsRequest from './ClickCountsRequest';
import BrowserUsageRequest from './BrowserUsageRequest';
import BrowserUsageResponse from './BrowserUsageResponse';
import BrowserPlatformsRequest from './BrowserPlatformsRequest';
import BrowserPlatformsResponse from './BrowserPlatformsResponse';
import ClickLocationRequest from './ClickLocationRequest';
import ClickLocationResponse from './ClickLocationResponse';
import CreateTagTriggerResponse from './CreateTagTriggerResponse';
import CreateTagTriggerRequest from './CreateTagTriggerRequest';
import EditTagTriggerRequest from './EditTagTriggerRequest';
import EditTagTriggerResponse from './EditTagTriggerResponse';
import TagTrigger from './TagTrigger';
import DeleteTagTriggerResponse from './DeleteTagTriggerResponse';
import TagTriggerListingRequest from './TagTriggerListingRequest';
import TagTriggerListingResponse from './TagTriggerListingResponse';
import CreateInboundRuleTriggerRequest from './CreateInboundRuleTriggerRequest';
import CreateInboundRuleTriggerResponse from './CreateInboundRuleTriggerResponse';
import DeleteInboundRuleTriggerResponse from './DeleteInboundRuleTriggerResponse';
import InboundRulesListingRequest from './InboundRulesListingRequest';
import InboundRulesListingResponse from './InboundRulesListingResponse';
import TemplateListingResponse from './TemplateListingResponse';
import TemplateListingRequest from './TemplateListingRequest';
import Template from './Template';
import DeleteTemplateResponse from './DeleteTemplateResponse';
import CreateTemplateRequest from './CreateTemplateRequest';
import CreateTemplateResponse from './CreateTemplateResponse';
import EditTemplateResponse from './EditTemplateResponse';
import EditTemplateRequest from './EditTemplateRequest';
import { ValidateTemplateContentResponse, ValidateTemplateContentRequest } from './ValidateTemplateContentRequest';
import IPagedFilter from './IPagedFilter';

export {
    HttpMethod,
    PostmarkMessage,
    PostmarkResponse,
    PostmarkError,
    TemplatedPostmarkMessage,
    StatisticsOverviewResponse,
    Bounce,
    Bounces,
    BounceDump,
    BounceActivateResponse,
    DeliveryStats,
    Server,
    OutboundMessageDetails,
    OutboundMessageDetailSearchResponse,
    OutboundMessageDetailsExtended,
    IClientOptions,
    IServerOptions,
    ValidateTemplateContentResponse,
    ValidateTemplateContentRequest,
    MessageOpensResponse,
    MessageClicksRequest,
    MessageClicksResponse,
    SingleMessageClicksRequest,
    SingleMessageClicksResponse,
    SingleMessageOpensRequest,
    SingleMessageOpensResponse,
    MessageOpensRequest,
    InboundMessageSearchRequest,
    InboundMessageSearchResponse,
    InboundMessageDetails,
    InboundBypassResponse,
    InboundRetryResponse,
    StatisticsOverviewRequest,
    SentCountsResponse,
    SentCountsRequest,
    BounceCountsRequest,
    BounceCountsResponse,
    SpamComplaintsResponse,
    SpamComplaintsRequest,
    TrackedEmailCountsRequest,
    TrackedEmailCountsResponse,
    EmailOpenCountsResponse,
    EmailOpenCountsRequest,
    EmailPlatformUsageRequest,
    EmailPlatformUsageResponse,
    EmailClientUsageRequest,
    EmailClientUsageResponse,
    EmailReadTimesRequest,
    EmailReadTimesResponse,
    ClickCountsResponse,
    ClickCountsRequest,
    BrowserUsageRequest,
    BrowserUsageResponse,
    BrowserPlatformsRequest,
    BrowserPlatformsResponse,
    ClickLocationRequest,
    ClickLocationResponse,
    CreateTagTriggerResponse,
    CreateTagTriggerRequest,
    EditTagTriggerRequest,
    EditTagTriggerResponse,
    TagTrigger,
    DeleteTagTriggerResponse,
    TagTriggerListingRequest,
    TagTriggerListingResponse,
    CreateInboundRuleTriggerRequest,
    CreateInboundRuleTriggerResponse,
    DeleteInboundRuleTriggerResponse,
    InboundRulesListingRequest,
    InboundRulesListingResponse,
    TemplateListingResponse,
    TemplateListingRequest,
    Template,
    DeleteTemplateResponse,
    CreateTemplateRequest,
    CreateTemplateResponse,
    EditTemplateResponse,
    EditTemplateRequest
};

export interface IBounceQueryFilter extends IPagedFilter { }
export interface IOutboundMessageFilter extends IPagedFilter { }
export interface IOpensFilter extends IPagedFilter { }
export interface IClicksFilter extends IPagedFilter { }

export interface IFakeFilteringOptions extends IPagedFilter { }
export interface IFakeOptions { }