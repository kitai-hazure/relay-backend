## Problem

People with disabilities and language barriers often face challenges in conversation. For individuals with disabilities, physical or communication limitations can make it difficult to express themselves effectively. For those with language barriers, they may struggle to understand the conversation or be understood by others. These challenges can lead to feelings of isolation and frustration, as well as misunderstandings and missed opportunities. To address these issues, it is important to create an inclusive and supportive environment where individuals feel comfortable and able to participate fully in conversations. We need assistive technologies to help people in this regards.

## Idea

The idea is to create a mobile application which people can use to conduct their conversations which has voice-to-text, text-to-speech, voice translations and text translations inbuilt to facilitate smoother conversations so that people can actually focus on the conversation instead of worrying about such barriers.

## Benefits

- Promotes inclusivity
- Promotes international events
- Eliminates language barriers
- Promotes healthy conversations

## Tech-stack

The mobile application is made Flutter and uses [socket.io](http://socket.io) to handle messages with the backend which is made using Nest.js, Prisma ORM, GraphQL, Socket.io, MongoDB, Azure Cognitive Language service and deployed on Azure.

## Future Work:

This can be extended to one to many or many to many conversations like speeches, online chatting, live events like workshops and events with people with multiple nationalities. This will give more chance for people with disablities to attend such events without fear. They can pay more attention to the actual content of discussions instead of worrying about their disablities in understanding, conveying and be themselves and proudly take part in coversations.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run dev

# production mode
$ yarn run start:prod
```
## Postman Workspace

[Workspace Link](https://www.canva.com/design/DAFZrVf9stg/6lTLJV1MHiz_9YX7VvpCqQ/view?utm_content=DAFZrVf9stg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Azure Deployment

[GraphQL Explorer](https://relay-backend.azurewebsites.net/graphql)

## Presentation

[Canva Presentation](https://www.canva.com/design/DAFZrVf9stg/6lTLJV1MHiz_9YX7VvpCqQ/view?utm_content=DAFZrVf9stg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
