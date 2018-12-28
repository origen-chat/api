import Observer from '@researchgate/react-intersection-observer';
import React from 'react';

import { ClassNameProp } from '../../types';

export type InfiniteScrollProps = Readonly<{
  rootElementId?: string;
  /**
   * Function to loads more items.
   */
  loadMore: LoadMore;
  /**
   * Element to show while loading for more
   * items.
   */
  loader: React.ReactNode;
  /**
   * Boolean indicating whether there are more
   * items to load or not.
   */
  hasMore: boolean;
  infiniteScrollDirection: InfiniteScrollDirection;
}> &
  ClassNameProp;

export type LoadMore = () => void | Promise<void>;

export type InfiniteScrollDirection = 'up' | 'down';

export class InfiniteScroll extends React.PureComponent<InfiniteScrollProps> {
  public static defaultProps = {
    infiniteScrollDirection: 'down',
    loader: null,
  };

  public render() {
    const {
      rootElementId,
      loadMore,
      loader,
      hasMore,
      infiniteScrollDirection,
      children,
    } = this.props;

    /**
     * A sentinel is en element we put at the end of the
     * scrollable parent and watch its intersection with its
     * parent. If the sentinel is visible, it means that we
     * should load more items.
     */
    const sentinel = renderSentinel({ loadMore, hasMore, rootElementId });

    return (
      <>
        {infiniteScrollDirection === 'up' && hasMore && (
          <>
            {loader}
            {sentinel}
          </>
        )}

        {children}

        {infiniteScrollDirection === 'down' && hasMore && (
          <>
            {sentinel}
            {loader}
          </>
        )}
      </>
    );
  }
}

type RenderSentinelArgs = Pick<InfiniteScrollProps, 'loadMore' | 'hasMore'> &
  Readonly<{
    rootElementId?: string;
  }>;

function renderSentinel(args: RenderSentinelArgs): React.ReactNode {
  return (
    <Observer
      onChange={makeIntersectionChangeHandler(args.loadMore)}
      root={args.rootElementId}
      threshold={1}
    >
      <div />
    </Observer>
  );
}

type IntersectionChangeHandler = (entry: IntersectionObserverEntry) => void;

function makeIntersectionChangeHandler(
  loadMore: LoadMore,
): IntersectionChangeHandler {
  const handleIntersectionChange: IntersectionChangeHandler = entry => {
    if (!entry.isIntersecting) {
      return;
    }

    loadMore();
  };

  return handleIntersectionChange;
}

export default InfiniteScroll;
