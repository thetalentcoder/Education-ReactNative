import { FaSort } from 'react-icons/fa';
import { TableProps } from 'types/table';
import { TablePagination } from './TablePagination';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Table = ({ data, columns, isLoading, className, sort, pagination, isPrint, draggable }: TableProps) => {
  return (
    <div className={`reactTable ${className}`}>
      <div className="overflow-x-auto lg:overflow-visible customScrollbar">
        <div className={`${isPrint ? 'w-full' : 'w-[1300px] lg:w-full'}`}>
          <div className="tableRow tableNav">
            {columns.map((column) => (
              <div key={column.key} className={`tableCell ${column.align}`}>
                <div
                  className="flex items-center gap-1 cursor-pointer w-fit"
                  onClick={() => {
                    if (column.sort) {
                      sort?.setSortQuery({
                        key: column.sort,
                        order:
                          sort.sortQuery.key[0] === column.sort[0] && sort.sortQuery.order === 'asc' ? 'desc' : 'asc'
                      });
                    }

                    if (pagination && column.sort) {
                      const sortBy = column.sort[0];
                      pagination.setFilters((p) => ({ ...p, sortBy, sortOrder: (p.sortOrder || 1) * -1 }));
                    }
                  }}
                >
                  {column.name}
                  {column.sort && <FaSort className="w-4 h-4 text-light-100" />}
                </div>
              </div>
            ))}
          </div>
          <div className="tableBody">
            {isLoading ? (
              <div className="placeholderText">
                <span>Loading...</span>
              </div>
            ) : data.length ? (
              draggable ? (
                <DragDropContext onDragEnd={draggable.onDragEnd}>
                  <Droppable droppableId="droppableTable" type="droppableTableItem">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {data.map((item, i) => (
                          <Draggable key={item._id || i} draggableId={`tableItem-${item._id}`} index={i}>
                            {(provided, snapshot) => (
                              <div
                                className={`tableRow ${snapshot.isDragging ? 'border bg-white' : ''}`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                {columns.map((column) => (
                                  <div key={column.key} className={`tableCell ${column.align}`}>
                                    {column.cell(item, i, provided)}
                                  </div>
                                ))}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                data.map((item, i) => (
                  <div key={item._id || i} className={`tableRow`}>
                    {columns.map((column) => (
                      <div key={column.key} className={`tableCell ${column.align}`}>
                        {column.cell(item, i)}
                      </div>
                    ))}
                  </div>
                ))
              )
            ) : (
              <div className="placeholderText">No results...</div>
            )}
          </div>
        </div>
      </div>
      {pagination ? <TablePagination {...pagination} /> : null}
    </div>
  );
};

export default Table;
