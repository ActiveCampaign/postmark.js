import ClientOptions from './client/ClientOptions';
import {HttpMethod} from './client/ClientOptions';
import {DefaultHeaderNames} from "./client/ClientOptions";

import QueryStringParameters from './client/QueryStringParameters';
import * as PostmarkErrors from './client/PostmarkError';
import {PostmarkCallback} from './client/PostmarkCallbacks';

import Bounces from './bounces/Bounces';
import Bounce from './bounces/Bounce';
import BounceDump from './bounces/BounceDump';
import BounceActivateResponse from './bounces/BounceActivateResponse';
import DeliveryStats from './bounces/DeliveryStats';

import Domain from './domains/Domain'
import Domains from './domains/Domains'
import DomainDetails from './domains/DomainDetails'

import Signature from './senders/Signature'
import Signatures from './senders/Signatures'
import SignatureDetails from './senders/SignatureDetails'
import SignatureToCreate from './senders/SignatureToCreate'

import Server from './server/Server';
import Servers from './server/Servers';

import OutboundMessageDetails, { OutboundMessageDetailsExtended } from './messages/OutboundMessageDetails';

import CreateTagTriggerResponse from './triggers/CreateTagTriggerResponse';
import CreateTagTriggerRequest from './triggers/CreateTagTriggerRequest';
import EditTagTriggerRequest from './triggers/EditTagTriggerRequest';
import TagTrigger from './triggers/TagTrigger';
import TagTriggerListingRequest from './triggers/TagTriggerListingRequest';
import TagTriggerListingResponse from './triggers/TagTriggerListingResponse';
import CreateInboundRuleTriggerRequest from './triggers/CreateInboundRuleTriggerRequest';
import CreateInboundRuleTriggerResponse from './triggers/CreateInboundRuleTriggerResponse';

import Template from './templates/Template';
import TemplateListingResponse from './templates/TemplateListingResponse';
import TemplateListingRequest from './templates/TemplateListingRequest';
import DeleteTemplateResponse from './templates/DeleteTemplateResponse';
import CreateTemplateRequest from './templates/CreateTemplateRequest';
import CreateTemplateResponse from './templates/CreateTemplateResponse';
import EditTemplateResponse from './templates/EditTemplateResponse';
import EditTemplateRequest from './templates/EditTemplateRequest';
import TemplatedPostmarkMessage from './templates/TemplatedPostmarkMessage';
import { ValidateTemplateContentResponse, ValidateTemplateContentRequest } from './templates/ValidateTemplateContentRequest';

export {
    HttpMethod,
    ClientOptions,
    PostmarkErrors,
    DefaultHeaderNames,

    TemplatedPostmarkMessage,
    PostmarkCallback,
    QueryStringParameters,

    Bounce,
    Bounces,
    BounceDump,
    BounceActivateResponse,
    DeliveryStats,

    Signature,
    Signatures,
    SignatureDetails,
    SignatureToCreate,

    Domain,
    Domains,
    DomainDetails,

    Server,
    Servers,

    OutboundMessageDetails,
    OutboundMessageDetailsExtended,
    ValidateTemplateContentResponse,
    ValidateTemplateContentRequest,

    CreateTagTriggerResponse,
    CreateTagTriggerRequest,
    EditTagTriggerRequest,
    TagTrigger,
    TagTriggerListingRequest,
    TagTriggerListingResponse,
    CreateInboundRuleTriggerRequest,
    CreateInboundRuleTriggerResponse,

    TemplateListingResponse,
    TemplateListingRequest,
    Template,
    DeleteTemplateResponse,
    CreateTemplateRequest,
    CreateTemplateResponse,
    EditTemplateResponse,
    EditTemplateRequest
};