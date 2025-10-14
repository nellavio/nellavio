import React from "react";

import { OrdersPaginationProps } from "./types";
import { Select } from "../../forms/Select";

export const OrdersPagination = ({
  itemsPerPage,
  currentPage,
  totalPage,
  setItemsPerPage,
  goToPage,
  prevPage,
  nextPage,
}: OrdersPaginationProps) => (
  <div className="flex items-center mt-8 gap-4 w-full sm:w-auto sm:gap-8 justify-between sm:justify-end text-primaryText">
    <div className="w-[4.5rem]">
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
      <button onClick={() => goToPage(0)} disabled={currentPage === 0}>
        &lt;&lt; {/* << */}
      </button>
      <button onClick={() => prevPage()} disabled={currentPage === 0}>
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
      >
        &gt; {/* > */}
      </button>
      <button
        onClick={() => goToPage(totalPage - 1)}
        disabled={currentPage === totalPage - 1}
      >
        &gt;&gt; {/* >> */}
      </button>
    </div>
  </div>
);
