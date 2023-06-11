import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: 'eu',
  useTLS: true,
});

export const pusherClient = new PusherClient('e6ce819a358334f9e469', {
  cluster: 'eu',
  channelAuthorization: {
    transport: 'ajax',
    endpoint: '/api/pusher/auth',
  },
});
