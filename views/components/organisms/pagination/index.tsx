import React, { Reducer, useReducer, useEffect } from 'react';
import {
  Intent,
  Position,
} from '@blueprintjs/core';
import { Button } from '@molecules';
import { Tooltip, ButtonGroup } from '@organisms';
import { IconNames } from '@blueprintjs/icons';

interface PaginationProps {
  initialPage?: number;
  total: number;
  limit?: number;
  onPageChange: (page: number) => void;
}

interface InitialPaginationState {
  currentPage: number;
  limit: number;
  total: number;
}

interface PaginationState extends InitialPaginationState {
  pages: number[];
  showEndEllipsis: boolean;
  showStartEllipsis: boolean;
  totalPages: number;
}

interface ChangePageAction {
  type: 'PAGE_CHANGE';
  page: number;
}

interface ChangeTotalAction {
  type: 'TOTAL_CHANGE';
  total: number;
}

interface ChangeLimitAction {
  type: 'LIMIT_CHANGE';
  limit: number;
}

type PaginationActions = 
| ChangePageAction
| ChangeTotalAction
| ChangeLimitAction

const PAGES_TO_SHOW = 5;
const PAGES_ON_EITHER_SIDE = 2;

const getState = ({ currentPage, limit, total }: InitialPaginationState): PaginationState => {
  const totalPages = Math.ceil(total / limit);
  let showStartEllipsis = false;
  let showEndEllipsis = false;
  // Create an array of pages to repeat in the pager control
  let startPage = 0;
  let endPage = 0;
  if (totalPages <= PAGES_TO_SHOW) {
    // Less than PAGES_TO_SHOW total pages, so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= PAGES_TO_SHOW - PAGES_ON_EITHER_SIDE) {
      // More than PAGINATION_THRESHOLD total pages so calculate start and end pages
      startPage = 1;
      endPage = PAGES_TO_SHOW;
      showEndEllipsis = true;
    } else if (currentPage + PAGES_ON_EITHER_SIDE >= totalPages) {
      // Current page approaching the total pages
      startPage = totalPages - (PAGES_TO_SHOW - 1);
      endPage = totalPages;
      showStartEllipsis = true;
    } else {
      // current page is somewhere in the middle
      startPage = currentPage - PAGES_ON_EITHER_SIDE;
      endPage = currentPage + PAGES_ON_EITHER_SIDE;
      showStartEllipsis = true;
      showEndEllipsis = true;
    }
  }
  const pages = Array.from(
    { length: endPage + 1 - startPage },
    (_, i) => startPage + i
  );
  // Too large or small currentPage
  let correctCurrentPage = currentPage;
  if (currentPage > totalPages) {
    correctCurrentPage = totalPages;
  }
  if (currentPage <= 0) {
    correctCurrentPage = 1;
  }
  return {
    currentPage: correctCurrentPage,
    pages,
    showEndEllipsis,
    showStartEllipsis,
    limit,
    total,
    totalPages
  };
};

const reducer: Reducer<PaginationState, PaginationActions> = (state, action) => {
  switch (action.type) {
    case 'PAGE_CHANGE':
      return getState({
        ...state,
        currentPage: action.page,
      });
    case 'TOTAL_CHANGE': {
      return getState({
        ...state,
        total: action.total
      });
    }
    case 'LIMIT_CHANGE': {
      return getState({
        ...state,
        limit: action.limit
      });
    }
    default:
      throw new Error();
  }
};

export const Pagination = React.memo<PaginationProps>(({
  initialPage = 1,
  total,
  limit = 10,
  onPageChange
}): JSX.Element => {
  // Compose the state
  const [state, dispatch] = useReducer(
    reducer,
    {
      currentPage: initialPage,
      total,
      limit,
      totalPages: 0,
      pages: [],
      showStartEllipsis: false,
      showEndEllipsis: false
    },
    getState
  );
  const changePage = (page: number) => {
    dispatch({
      type: 'PAGE_CHANGE',
      page
    });
    onPageChange(page);
  };
  // Update the pagination if total and limit change
  useEffect(() => {
    dispatch({
      type: 'TOTAL_CHANGE',
      total
    });
  }, [total]);
  useEffect(() => {
    dispatch({
      type: 'LIMIT_CHANGE',
      limit
    });
  }, [limit]);
  // Hide the pagination when there is only 1 page
  if (state.totalPages === 1) {
    return null;
  }
  return (
    <div>
      <ButtonGroup>
        <Tooltip
          content="First Page"
          disabled={state.currentPage === 1}
          position={Position.TOP}
        >
          <Button
            disabled={state.currentPage === 1}
            icon={IconNames.DOUBLE_CHEVRON_LEFT}
            onClick={() => changePage(1)}
          />
        </Tooltip>
        <Tooltip
          content="Previous Page"
          disabled={state.currentPage === 1}
          position={Position.TOP}
        >
          <Button
            icon={IconNames.CHEVRON_LEFT}
            disabled={state.currentPage === 1}
            onClick={() =>
              changePage(Math.max(1, state.currentPage - 1))
            }
          />
        </Tooltip>
        {state.showStartEllipsis && (
          <Button disabled={true}>&#8230;</Button>
        )}
        {state.pages.map(page => (
          <Button
            key={page}
            intent={
              state.currentPage === page
                ? Intent.PRIMARY
                : Intent.NONE
            }
            onClick={() => changePage(page)}
          >
            {page}
          </Button>
        ))}
        {state.showEndEllipsis && (
          <Button disabled={true}>&#8230;</Button>
        )}
        <Tooltip
          content="Next Page"
          disabled={state.currentPage === state.totalPages}
          position={Position.TOP}
        >
          <Button
            icon={IconNames.CHEVRON_RIGHT}
            disabled={state.currentPage === state.totalPages}
            onClick={() =>
              changePage(
                Math.min(
                  state.currentPage + 1,
                  state.totalPages
                )
              )
            }
          />
        </Tooltip>
        <Tooltip
          content="Last Page"
          disabled={state.currentPage === state.totalPages}
          position={Position.TOP}
        >
          <Button
            disabled={state.currentPage === state.totalPages}
            icon={IconNames.DOUBLE_CHEVRON_RIGHT}
            onClick={() => changePage(state.totalPages)}
          />
        </Tooltip>
      </ButtonGroup>
    </div>
  );
});

export default Pagination;
