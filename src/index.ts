import ServerClient from './client/ServerClient';
import AccountClient from './client/AccountClient';

import * as Models from './client/models';
import * as Errors from './client/models/client/Errors'

// New client types are provided also as aliases, to provide compatibility with version 1.x of the library.
type Client = ServerClient;
type AdminClient = AccountClient;

// These essential types are exposed directly to make working with common requests simpler.
type Message = Models.Message;
type TemplatedMessage = Models.TemplatedMessage;
type Attachment = Models.Attachment;
type Header = Models.Header;

export { ServerClient, AccountClient,Client, AdminClient, Models, Errors, Message, TemplatedMessage, Attachment, Header };