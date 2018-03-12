import { HttpMethod } from './SupportingTypes';
import PostmarkMessage from './PostmarkMessage';
import PostmarkResponse from './PostmarkResponse';
import PostmarkError from './PostmarkError';
import TemplatedPostmarkMessage from './TemplatedPostmarkMessage';
import IClientOptions from './IClientOptions';
import DeliveryStatisticsResponse from './DeliveryStatisticsResponse';
import BounceListingResponse from './BounceListingResponse';

export {
    HttpMethod,
    PostmarkMessage,
    PostmarkResponse,
    PostmarkError,
    TemplatedPostmarkMessage,
    DeliveryStatisticsResponse,
    BounceListingResponse,
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