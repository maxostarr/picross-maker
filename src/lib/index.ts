
export const queryifyBoard = ( board: number[][] ) => {
  return btoa( board.map( row => row.join( '' ) ).join( ';' ) )
}

export const dequeryifyBoard = ( str: string ) => {
  return atob( str ).split( ';' ).map( row => row.split( '' ).map( cell => parseInt( cell ) ) );
}