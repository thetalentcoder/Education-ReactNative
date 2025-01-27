import { useState } from 'react';
import { BsPen, BsTrash3 } from 'react-icons/bs';

import { Pagination, SortProps, TableColumn } from 'types/table';

import { Video } from 'api/video/types';

import VideoTable from 'components/ui/VideoTable';
import { TableActions } from 'components/ui/TableActions';


interface Props {
  isLoading: boolean;
  data: Video[];
  onDelete: (id: string) => void;
  onUpdate: (org: Video) => void;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  sort?: SortProps;
  pagination?: Pagination;
}

export const VideosTable = ({
  data,
  isLoading,
  sort,
  selected,
  setSelected,
  onUpdate,
  onDelete,
  pagination,
}: Props) => {
  const [activeMenu, setActiveMenu] = useState('');

  const isOneDigitNumber = (num: number) => num >= 0 && num < 10;

  const columns: TableColumn[] = [
      {
            key: 'video',
            name: 'Video',
            cell: (item: Video) => (
              <div>
                <iframe
                  src={`https://player.vimeo.com/video/${item.vimeoId}`}
                  width="200" // Adjust width as needed
                  height="113" // Adjust height as needed
                  frameBorder="0"
                  title={`Video titled: ${item.title}`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )
          },
    {
      key: 'title',
      name: 'Title',
      cell: (item: Video, i) => (
        <div className="flex flex-1 items-center gap-3">
          {item.title}
        </div>
      )
    },
    {
      key: 'description',
      name: 'Description',
      cell: (item: Video) => (
        <div>
          {item.description}
        </div>
      )
    },
    {
      key: 'vimeoId',
      name: 'Vimeo ID',
      cell: (item: Video) => (
        <div>
          {item.vimeoId}
        </div>
      )
    },

    {
      key: 'options',
      name: '',
      align: 'center',
      cell: (item: Video) => (
        <TableActions itemID={item._id} activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
          <li onClick={() => onUpdate(item)}>
            <BsPen className="text-light-200" /> Edit Video
          </li>

          <li onClick={() => onDelete(item._id)}>
            <BsTrash3 className="text-danger" />
            Delete Video
          </li>
        </TableActions>
      )
    }
  ];

  return (
    <VideoTable
      pagination={pagination}
      sort={sort}
      isLoading={isLoading}
      data={data}
      columns={columns}
      className="videoTable"
    />
  );
};
