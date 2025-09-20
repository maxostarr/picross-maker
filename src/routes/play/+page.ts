import type { PageLoad } from './$types';

export const load: PageLoad = ( { url } ) => {
  return {
    board: url.searchParams.get( 'board' ) ?? undefined
  };
};