import { useMemo, useState, useEffect } from "react";
import { useTable, Column } from "react-table";
import "./usersTable.css";
import ReactPaginate from "react-paginate";
import emptyBox from "../emptybox.png";
import axios from "axios";
import { useQuery } from "react-query";

interface UserData {
  name: string;
  email: string;
  matNo: string;
  status: string;
}

const UsersTable = () => {
  // console.log({ items });
  // const { allUsers: items } = useUser();

  const fetchElections = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/users`
    );
    return response.data;
  };

  const { data: items } = useQuery("users", fetchElections);

  const [currentItems, setCurrentItems] = useState<UserData[]>(items); // Use explicit type
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const itemsPerPage: number = 10;

  useEffect(() => {
    if (!Array.isArray(items)) {
      console.error("Items is not an array:", items);
      return;
    }

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    if (itemOffset >= items.length) {
      console.warn("Item offset exceeds the number of items:", itemOffset);
      return;
    }

    const currentData: UserData[] = items.slice(itemOffset, endOffset);
    setCurrentItems(currentData);
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const data = currentItems;

  const columns: Column[] = useMemo(
    () => [
      { Header: "S/N", accessor: (_: any, rowIndex: number) => rowIndex + 1 },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Matriculation Number", accessor: "matNo" },
      {
        Header: "Status",
        accessor: "candidate",
        Cell: ({ value }) => {
          if (value === true) {
            return <span className="candidate-status">candidate</span>;
          } else {
            return <span className="user-status">user</span>;
          }
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="pack__table__div">
      <div className="pack__table__head">
        <h2>Registered Users</h2>
      </div>

      {data.length !== 0 ? (
        <div className="pack__table__container">
          <div className="pack__table__wrapper">
            <table className="pack__table__content" {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup: any) => (
                  <tr
                    className="pack__table__header-row"
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column: any) => (
                      <th
                        className="pack__table__header-cell"
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="pack__table__body" {...getTableBodyProps()}>
                {rows.map((row: any) => {
                  prepareRow(row);
                  return (
                    <tr className="pack__table__row" {...row.getRowProps()}>
                      {row.cells.map((cell: any) => {
                        return (
                          <td
                            className="pack__table__cell"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="pagination-container">
            <ReactPaginate
              breakLabel="..."
              nextLabel=" >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< "
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageClassName="pagination__item"
              activeClassName="pagination__item--active"
              nextClassName="pagination__next"
              previousClassName="pagination__previous"
            />
          </div>
        </div>
      ) : (
        <div className="mpnft__empty">
          <img src={emptyBox} alt="" />
          <p>No Users Found </p>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
