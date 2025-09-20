// place files you want to import through the `$lib` alias in this folder.

export const queryifyBoard = ( board: boolean[][] ) => {
  return board.map( row => row.map( x => x ? 1 : 0 ).join( ',' ) ).join( ';' );
}

export const dequeryifyBoard = ( str: string ) => {
  console.log( str );
  return str.split( ';' ).map( row => row.split( ',' ).map( x => x === '1' ) );
}