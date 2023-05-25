import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';
import Header from '@/app/conversations/[conversationId]/components/Header';
import Body from '@/app/conversations/[conversationId]/components/Body';

interface Params {
  conversationId: string;
}

const ConversationID = async ({ params }: { params: Params }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex h-full flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full lg:pl-80">
      <div className="flex h-full flex-col">
        <Header conversation={conversation}></Header>
        <Body />
      </div>
    </div>
  );
};

export default ConversationID;
