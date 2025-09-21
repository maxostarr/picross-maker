

let imageGrid: number[][] = $state( [ [] ] );
let playGrid: number[][] = $state( [ [] ] );

export const getImageGrid = () => imageGrid;
export const getPlayGrid = () => playGrid;

export function resetPlayGrid () {
  playGrid = imageGrid.map( ( row ) => row.map( () => 0 ) );
}

export function toggleCell ( row: number, col: number ) {
  playGrid[ row ][ col ] = ( playGrid[ row ][ col ] + 1 ) % 3;
}

export function isComplete () {
  for ( let r = 0; r < imageGrid.length; r++ ) {
    for ( let c = 0; c < imageGrid[ 0 ].length; c++ ) {
      if ( ( imageGrid[ r ][ c ] === 1 && playGrid[ r ][ c ] !== 1 ) || ( imageGrid[ r ][ c ] === 0 && playGrid[ r ][ c ] === 1 ) ) {
        return false;
      }
    }
  }
  return true;
}

export function setImageGrid ( newGrid: number[][] ) {
  imageGrid = newGrid;
  resetPlayGrid();
}

export const rowLabels: number[][] = $derived.by( () => {
  return imageGrid.map( ( row ) => {
    const labels: number[] = [];
    let count = 0;
    for ( const cell of row ) {
      if ( cell === 1 ) {
        count++;
      } else {
        if ( count > 0 ) {
          labels.push( count );
          count = 0;
        }
      }
    }
    if ( count > 0 ) {
      labels.push( count );
    }
    if ( labels.length === 0 ) {
      labels.push( 0 );
    }
    return labels;
  } );
} );

export const colLabels: number[][] = $derived.by( () => {
  const numCols = imageGrid[ 0 ].length;
  const labels: number[][] = [];
  for ( let c = 0; c < numCols; c++ ) {
    const colLabels: number[] = [];
    let count = 0;
    for ( let r = 0; r < imageGrid.length; r++ ) {
      if ( imageGrid[ r ][ c ] === 1 ) {
        count++;
      } else {
        if ( count > 0 ) {
          colLabels.push( count );
          count = 0;
        }
      }
    }
    if ( count > 0 ) {
      colLabels.push( count );
    }
    if ( colLabels.length === 0 ) {
      colLabels.push( 0 );
    }
    labels.push( colLabels );
  }
  return labels;
} );