import { HttpMethod } from './SupportingTypes';
import PostmarkMessage from './PostmarkMessage';
import PostmarkResponse from './PostmarkResponse';
import PostmarkError from './PostmarkError';
import TemplatedPostmarkMessage from './TemplatedPostmarkMessage';
import IClientOptions from './IClientOptions';
import StatisticsOverviewResponse from './StatisticsOverviewResponse';
import BounceListingResponse from './BounceListingResponse';
import Server from './Server';
import DeliveryStatisticsResponse from './DeliveryStatisticsResponse';

export {
    HttpMethod,
    PostmarkMessage,
    PostmarkResponse,
    PostmarkError,
    TemplatedPostmarkMessage,
    StatisticsOverviewResponse,
    BounceListingResponse,
    DeliveryStatisticsResponse,
    Server,
    IClientOptions
};

interface IPagedFilter {
    count?: number
    offset?: number
}

export interface IBounceQueryFilter extends IPagedFilter { }
export interface IOutboundMessageFilter extends IPagedFilter { }
export interface IOpensFilter extends IPagedFilter { }
export interface IClicksFilter extends IPagedFilter { }

export interface IServerOptions{
    name?: string
}

export interface IFakeFilteringOptions { }
export interface IFakeOptions { }