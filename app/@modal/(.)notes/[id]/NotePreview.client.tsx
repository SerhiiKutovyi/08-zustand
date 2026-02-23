import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';

import css from '@/components/NotePreview/NotePreview.module.css';
import Modal from '@/components/Modal/Modal';

interface NotePreviewModalProps {
  onClose: () => void;
}

function NotePreviewModal({ onClose }: NotePreviewModalProps) {
  const router = useRouter();

  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <div className={css.container}>
        <p className={css.loading}>Loading, please wait...</p>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className={css.container}>
        <p className={css.error}>Something went wrong while loading note.</p>
      </div>
    );
  }

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
           {note.tag && (
              <span className={css.tagBadge}>#{note.tag}</span>
            )}
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
        <button className={css.closeBtn} onClick={() => router.back()}>
          Close
        </button>
      </div>
    </Modal>
  );
}
export default NotePreviewModal;
