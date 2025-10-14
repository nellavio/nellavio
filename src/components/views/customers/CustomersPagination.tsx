import React from "react";

import { Select } from "../../forms/Select";
import { CustomersPaginationProps } from "./types";

export const CustomersPagination = ({
  itemsPerPage,
  currentPage,
  totalPage,
  setItemsPerPage,
  goToPage,
  prevPage,
  nextPage,
}: CustomersPaginationProps) => {
  return (
    <div className="flex items-center mt-8 gap-4 w-full sm:w-auto justify-between sm:justify-end self-start sm:self-unset">
      <div className="w-[4.5rem] sm:mr-8">
        <Select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            goToPage(0);
          }}
          customOnDesktop={true}
          customOptions={["10", "50", "100"]}
          direction="top"
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => goToPage(0)}
          disabled={currentPage === 0}
          className="text-primaryText"
        >
          &lt;&lt; {/* << */}
        </button>
        <button
          onClick={() => prevPage()}
          disabled={currentPage === 0}
          className="text-primaryText"
        >
          &lt; {/* < */}
        </button>
        {Array.from(Array(totalPage).keys())
          .slice(Math.max(0, currentPage - 2), currentPage + 3)
          .map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={
                currentPage === page
                  ? "bg-paginationActiveBg px-1 text-primaryText"
                  : "px-1 text-primaryText"
              }
              disabled={currentPage === page}
            >
              {page + 1}
            </button>
          ))}
        <button
          onClick={() => nextPage()}
          disabled={currentPage === totalPage - 1}
          className="text-primaryText"
        >
          &gt; {/* > */}
        </button>
        <button
          onClick={() => goToPage(totalPage - 1)}
          disabled={currentPage === totalPage - 1}
          className="text-primaryText"
        >
          &gt;&gt; {/* >> */}
        </button>
      </div>
    </div>
  );
};
