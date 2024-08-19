# Changelog

## 4.0.5

* update axios to 1.7.4

## 4.0.4

* update axios to 1.7.2

## 4.0.3

* updated models to support adding content disposition to attachments
* update domain model

## 4.0.2

* updated models to be more accurate mostly within webhook payloads area

## 4.0.1

* update development libraries

## 4.0.0

* dropped support for older EOL Node JS versions, minimum supported Node version is 14.0.0
* updated axios to the version 1.6.2

## 3.11.0

* added filtering to get suppressions endpoint

## 3.1.2

* add content type header to the http client default headers list

## 3.1.1

* small naming update for data removal endpoints

## 3.1.0

* added data removal endpoints

## 3.0.20

* small fix to webhook types model

## 3.0.19

* updated model to contain webhook types

## 3.0.18

* fix domain endpoint request types

## 3.0.17

* updated test library versions
* switched from nconf to dotenv for configuration loading for tests

## 3.0.15

* added Sanboxed field to the outbound message model
* fix parsing bounced messages

## 3.0.14

* Updated statistics filtering parameter

## 3.0.13

* Minor code fix, fixing up library versions for older versions of node

## 3.0.12

* Migrated to ActiveCampaign

## 3.0.11

* Small bug fix to data model

## 3.0.1

* Separated error handling responsibility between postmark client and http client

## 3.0.0

* Updated message response for sending
* Decoupled and refactored http client part of the library

## 2.9.5

* Improved error handling 
* Parsed inactive recipients when email sending  

## 2.9.0

* Update sender signature name field to match documentation by being required
* Updated dev libraries to resolve security issues (typedoc, typescript)
* Updated axios http client version

## 2.8.2

Update attachments model for inbound and outbound messages

## 2.8.1

Updated sender signature model with personal note

## 2.7.9

Updated axios client version

## 2.7.7

* Added delivery types to server model

## 2.7.6

* Improved data model for webhook triggers

## 2.7.4

* Small update to the server update model

## 2.7.3 

* Updated message streams model with unsubscribe types

## 2.7.2

* Remove old request client dev dependency

## 2.7.1

* Increase client tolerance to long and big requests

## 2.7.0

* Updated axios to 0.21.1

## 2.6.1

* Updated createWebhook endpoint to support MessageStream
* default CI tool is now circleCi

## 2.6.0

* Added message stream endpoints

## 2.5.6

* Updated release docs and sending message response model

## 2.5.5

* library updates

## 2.5.4

* Fix domain details model

## 2.5.3

* Http client size limitation removed

## 2.5.2

* Better error handling
* Improved client options setup and default client setup

## 2.3.5

* Added supression management

## 2.3.4

* Removed obsolete TriggerTags endpoint and added filtering bounces by stream

## 2.3.2

* messages can now be filtered by message stream
* bounceTags endpoint is deprecated/removed

## 2.3.1

* Added webhook management support
* Improved test coverage
* Improved type model

## 2.3.0

* Small improvement to error handling

## 2.2.8

* Servers list type model update

## 2.2.7

* Template layouts support

## 2.2.6

* Add support for metadata for email templates

## 2.2.5

* Ignore docs from npm library

## 2.2.4

* Added templates push feature

## 2.2.2

* Minor fix for proper error handling

## 2.2.0

* added filtering by count, offset defaults in case of passing parameters straight to client methods
* updated aliases for client objects for backward compatibility

## 2.1.0

* Make filter parameters use constructors for simpler querying
* Minor type definition re-organization

## 2.0.0

* migrated library to add Typescript support
* removed not needed dependencies
* completely revamped the client with simpler call model (callbacks, promises, http requests separation etc)
* added custom error handling
* added all missing account level, server level endpoints (verifyDKIM for example)

## 1.0.0

* Initial release
