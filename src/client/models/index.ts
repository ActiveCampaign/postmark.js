import ClientOptions from './client/ClientOptions';
import {HttpMethod} from './client/ClientOptions';
import {DefaultHeaderNames} from "./client/ClientOptions";
import QueryStringParameters from './client/QueryStringParameters';
import * as PostmarkErrors from './client/PostmarkError';
import {PostmarkCallback} from './client/PostmarkCallbacks';
import DefaultResponse from './client/PostmarkResponse';

import Message from './message/Message';
import MessageResponse from "./message/MessageResponse";

import Bounces from './bounces/Bounces';
import Bounce from './bounces/Bounce';
import BounceDump from './bounces/BounceDump';
import BounceActivateResponse from './bounces/BounceActivateResponse';
import DeliveryStatistics from './bounces/DeliveryStats';

import Server from './server/Server';
import {ServerOptions} from './server/Server';



import Domain from './domains/Domain';
import DomainOptions from './domains/Domain';
import Domains from './domains/Domains';
import DomainDetails from './domains/DomainDetails';

import Signature from './senders/Signature';
import Signatures from './senders/Signatures';
import SignatureDetails from './senders/SignatureDetails';
import SignatureToCreate from './senders/SignatureToCreate';


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
    QueryStringParameters,
    PostmarkCallback,
    DefaultResponse,


    Message,
    MessageResponse,

    Bounce,
    Bounces,
    BounceDump,
    BounceActivateResponse,
    DeliveryStatistics,

    Server,
    ServerOptions,

    Signature,
    Signatures,
    SignatureDetails,
    SignatureToCreate,

    Domain,
    DomainOptions,
    Domains,
    DomainDetails,


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

    TemplatedPostmarkMessage,
    TemplateListingResponse,
    TemplateListingRequest,
    Template,
    DeleteTemplateResponse,
    CreateTemplateRequest,
    CreateTemplateResponse,
    EditTemplateResponse,
    EditTemplateRequest
};