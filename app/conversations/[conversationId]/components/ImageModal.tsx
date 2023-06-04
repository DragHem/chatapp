'use client';

import Image from 'next/image';
import Modal from '@/app/components/Modal';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal = ({ isOpen, onClose, src }: Props) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-80 w-80">
        <Image className="object-contain p-5" fill alt="Image" src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
