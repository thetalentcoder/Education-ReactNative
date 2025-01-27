import { useEffect, useState } from 'react';
import { BiPlus, BiTrash } from 'react-icons/bi';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { SearchField } from 'components/ui/SearchField';
import { useAuthStore } from 'store/auth';
import { SecurityModal } from '../components/util/SecurityModal';
import { Filters } from '../types/global';
import { USER_ADMIN } from 'api/users/types';
import { VideoFormModal } from 'components/shared/forms/VideoFormModal';
import { VideosTable } from 'components/shared/tables/VideosTable';
import { Video } from 'api/video/types';
import { deleteVideos, videosWithFilter } from 'api/video';


export const Videos = () => {
    const [itemForUpdate, setItemForUpdate] = useState<Video | null>(null);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [isOpenSecurity, setIsOpenSecurity] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [filters, setFilters] = useState<Filters>({
        limit: 10,
        page: 1,
        search: '',
        filter: {
            _id: (queryParams.get('search') as string) || '',
        }
    });

    const { user } = useAuthStore();
    const { mutate } = useMutation(deleteVideos);

    const { data, refetch, isLoading } = useQuery(['video'], () => videosWithFilter(filters));
    const onDelete = (ids: string[]) =>
        mutate(ids, {
            onSuccess: () => {
                refetch();
                if (selected.length) setSelected([]);
            }
        });

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    useEffect(() => {
        if (filters.search) {
            setFilters((p) => ({ ...p }));
        }
    }, [filters.search]);

    return (
        <div>
            <div className="fixed top-0 left-0 right-0 lg:static flex items-center justify-between gap-3 p-3 lg:p-5 bg-white z-50 shadow-card lg:shadow-none">
                <div className="flex items-center gap-4">
                    <SearchField setSearchQuery={(val) => setFilters((p) => ({ ...p, search: val }))} />
                </div>

                {isOpenSecurity && (
                    <SecurityModal
                        text={`Are you sure you want to delete ${selected.length} ${selected.length > 1 ? 'Cards' : 'Card'
                            }?`}
                        onClick={() => {
                            onDelete(selected);
                            setIsOpenSecurity(false);
                            setSelected([]);
                        }}
                        btnText="Delete "
                        close={() => {
                            setSelected([]);
                            setIsOpenSecurity(false);
                        }}
                    />
                )}

                <div className="flex items-center gap-6">
                    {selected.length ? (
                        <button
                            className="iconBtn danger"
                            onClick={() => {
                                setSelected(selected);
                                setIsOpenSecurity(true);
                            }}
                        >
                            <BiTrash />
                        </button>
                    ) : null}
                    {(user?.role === USER_ADMIN) && (
                        <button className="secondaryBtn !capitalize" onClick={() => setIsOpenCreateModal(true)}>
                            <BiPlus />
                            New Card
                        </button>
                    )}
                </div>
            </div>
            <div className="p-5">
                <VideosTable
                    isLoading={isLoading}
                    data={data?.result || []}
                    onUpdate={(item) => setItemForUpdate(item)}
                    onDelete={(id) => {
                        setSelected([id]);
                        setIsOpenSecurity(true);
                    }}
                    selected={selected}
                    setSelected={setSelected}
                    pagination={{ filters, setFilters, totalCount: data?.total || 0 }}
                />
            </div>
            {(isOpenCreateModal || itemForUpdate) && (
                <VideoFormModal
                    video={itemForUpdate}
                    refetch={refetch}
                    onClose={() => {
                        setIsOpenCreateModal(false);
                        setItemForUpdate(null);
                    }}
                />
            )}
        </div>
    );
};
