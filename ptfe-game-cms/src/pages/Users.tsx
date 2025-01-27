import { useEffect, useState } from 'react';
import { BsTrash3 } from 'react-icons/bs';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { Filters } from 'types/global';
// import { useAuthStore } from 'store/auth';
import { User } from 'api/users/types';

import { SearchField } from 'components/ui/SearchField';
import { UserTable } from 'components/UserTable';
import { SecurityModal } from 'components/util/SecurityModal';

import { deleteUser, fetchUsers } from 'api/users';
import { UserFormModal } from 'components/shared/forms/UserFormModal';

export const Users = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const [isOpenSecurity, setIsOpenSecurity] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
  
  const { mutate: deleteMutate } = useMutation(deleteUser);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  // const { user } = useAuthStore();

  const [filters, setFilters] = useState<Filters>({
    limit: 25,
    page: 1,
    search: '',
    sortBy: 'createdAt',
    sortOrder: -1,
    filter: { organization: queryParams.get('organizationId') || '' }
  });

  const { data, refetch, isLoading } = useQuery(['users'], () => fetchUsers(filters));
  
  const onDelete = (ids: string[]) =>
    deleteMutate(ids, {
      onSuccess: () => {
        refetch();
        setSelected([]);
      }
  });

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  console.log(data);
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 lg:static flex items-center justify-between gap-3 p-3 lg:p-5 bg-white z-50 shadow-card lg:shadow-none">
        <div className="flex items-center gap-2">
          <SearchField setSearchQuery={(val) => setFilters((p) => ({ ...p, search: val }))} />
        </div>

        {isOpenSecurity && (
          <SecurityModal
            text={`Are you sure you want to delete ${selected.length} ${selected.length > 1 ? 'students' : 'student'}?`}
            onClick={() => {
              onDelete(selected);
              setSelected([]);
              setIsOpenSecurity(false);
            }}
            btnText="Delete "
            close={() => {
              setSelected([]);
              setIsOpenSecurity(false);
            }}
          />
        )}

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3">
            {selected.length ? (
              <button className="iconBtn danger" onClick={() => setIsOpenSecurity(true)}>
                <BsTrash3 />
              </button>
            ) : null}
            {/* <button className="iconBtn" onClick={() => setActiveView('list')}>
              <PiListBold className={isActiveClass(activeView === 'list', '!text-danger')} />
            </button>
            <button className="iconBtn" onClick={() => setActiveView('grid')}>
              <BsGridFill className={isActiveClass(activeView === 'grid', '!text-danger')} />
            </button> */}
          </div>
        </div>
      </div>

      <div className="p-5">
        <UserTable
            isLoading={isLoading}
            data={data?.users || []}
            onUpdate={(user) => setUserToUpdate(user)}
            onDelete={(id) => {
                setIsOpenSecurity(true);
                setSelected([id]);
            }}
            selected={selected}
            setSelected={setSelected}
            pagination={{ filters, setFilters, totalCount: data?.count || 0 }}
        />
      </div>
      {(isOpenModal || userToUpdate) && (
        <UserFormModal
          user={userToUpdate}
          onClose={() => {
            refetch();
            setIsOpenModal(false);
            setUserToUpdate(null);
          }}
        />
      )}
    </div>
  );
};
