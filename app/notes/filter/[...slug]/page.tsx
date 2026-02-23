import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

async function SlugPage({ params }: Props) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const tagFromUrl = slug?.[0];
  const normalizedTag =
    tagFromUrl && tagFromUrl !== 'all' ? tagFromUrl : undefined;

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', normalizedTag],
    queryFn: () => fetchNotes(1, '', normalizedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={normalizedTag} />
    </HydrationBoundary>
  );
}

export default SlugPage;
