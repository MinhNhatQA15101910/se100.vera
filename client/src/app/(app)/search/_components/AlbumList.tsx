import { getAllAlbums } from '@/actions/album-actions';
import PaginationButtons from '@/components/PaginatedButtons';
import AlbumCard from '@/components/ui/AlbumCard';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export interface AlbumListProps {
  keyword: string;
}

const AlbumList: React.FC<AlbumListProps> = ({ keyword }) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const pageSize = 6;

  const debouncedKeyword = useDebounce(keyword, 300);

  const { data } = useQuery({
    queryKey: ['albums', currentPage, pageSize, debouncedKeyword], // Changed 'songs' to 'albums'
    queryFn: async () => {
      const response = await getAllAlbums(
        currentPage,
        pageSize,
        debouncedKeyword
      );
      return response;
    },
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-[90%] min-h-screen flex flex-col bg-transparent text-general-white items-center custom1-table">
      {data?.albums.length === 0 ? (
        <h2 className="text-2xl font-bold mb-4">No results found</h2>
      ) : (
        <>
          <div className="grid grid-cols-6 grid-rows-3 gap-2">
            {data &&
              data?.albums.map((album, idx) => {
                return (
                  <div key={idx} className="flex flex-col">
                    <AlbumCard albumCard={album} />
                  </div>
                );
              })}
          </div>
          <PaginationButtons
            pageSize={pageSize}
            currentPage={currentPage}
            totalCount={data?.pagination.totalItems || 0}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default AlbumList;
