import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useConversation = () => {
  const { conversationId: id } = useParams();

  const conversationId = useMemo(() => {
    if (!id) {
      return '';
    }

    return id;
  }, [id]);

  const isOpen = useMemo(() => !!id, [id]);

  return useMemo(() => ({ isOpen, conversationId }), [isOpen, id]);
};

export default useConversation;
