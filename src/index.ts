import ServerClient from './client/ServerClient';
import AccountClient from './client/AccountClient';

type Client = ServerClient;

import * as Models from './client/models';
import * as Errors from './client/models/client/Errors'

// These essential types are exposed directly
// to make working with common requests simpler.
type Message = Models.Message;
type TemplatedMessage = Models.TemplateMessage;
type Attachment = Models.Attachment;
type Header = Models.Header;

export { ServerClient, AccountClient, Client, Models, Errors, Message, TemplatedMessage, Attachment, Header };