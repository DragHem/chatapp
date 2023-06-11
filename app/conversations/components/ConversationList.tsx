'use client';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useConversation from '@/app/hooks/useConversation';

import { FullConversationType } from '@/app/types';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from '@/app/conversations/components/ConversationBox';
import GroupChatModal from '@/app/conversations/components/GroupChatModal';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';

interface Props {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList = ({ initialItems, users }: Props) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey);

    const newConversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) return current;

        return [conversation, ...current];
      });
    };
    const conversationUpdateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return { ...currentConversation, messages: conversation.messages };
          }

          return currentConversation;
        })
      );
    };
    const conversationRemoveHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((conv) => conv.id !== conversation.id)];
      });

      if (conversationId === conversation.id) router.push('/conversations');
    };

    pusherClient.bind('conversation:new', newConversationHandler);
    pusherClient.bind('conversation:update', conversationUpdateHandler);
    pusherClient.bind('conversation:remove', conversationRemoveHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newConversationHandler);
      pusherClient.unbind('conversation:update', conversationUpdateHandler);
      pusherClient.unbind('conversation:remove', conversationRemoveHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          'fixed inset-y-0 overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0',
          isOpen ? 'hidden' : 'left-0 block w-full'
        )}
      >
        <div className="px-5">
          <div className="mb-4 flex justify-between pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 transition hover:opacity-75"
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
