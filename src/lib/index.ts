// place files you want to import through the `$lib` alias in this folder.

export const queryifyBoard = ( board: number[][] ) => {
  return board.map( row => row.join( ',' ) ).join( ';' );
}

export const dequeryifyBoard = ( str: string ) => {
  console.log( str );
  return str.split( ';' ).map( row => row.split( ',' ).map( cell => parseInt( cell ) ) );
}