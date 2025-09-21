

let imageGrid: number[][] = $state( [ [] ] );
let playGrid: number[][] = $state( [ [] ] );
let rowLabelState: number[][] = $state( [ [] ] );
let colLabelState: number[][] = $state( [ [] ] );

export const getImageGrid = () => imageGrid;
export const getPlayGrid = () => playGrid;
export const getRowLabelState = () => rowLabelState;
export const getColLabelState = () => colLabelState;

export function resetPlayGrid () {
  playGrid = imageGrid.map( ( row ) => row.map( () => 0 ) );
  rowLabelState = imageGrid.map( () => [] );
  colLabelState = imageGrid[ 0 ].map( () => [] );
}

export function toggleCell ( row: number, col: number ) {
  playGrid[ row ][ col ] = ( playGrid[ row ][ col ] + 1 ) % 3;
  updateRowLabelState( row );
  updateColLabelState( col );
}

export function updateRowLabelState ( rowIndex: number ): void {
  const row = playGrid[ rowIndex ];
  const labels = getRowLabels()[ rowIndex ];
  const newState: number[] = [];
  let labelIndex = 0;
  let count = 0;

  for ( let i = 0; i < row.length; i++ ) {
    if ( row[ i ] === 1 ) {
      count++;
    } else {
      if ( count > 0 ) {
        if ( labelIndex < labels.length && count === labels[ labelIndex ] ) {
          newState.push( 1 ); // Correct
        } else if ( labelIndex < labels.length && count > labels[ labelIndex ] ) {
          newState.push( 2 ); // Incorrect
        } else {
          newState.push( 0 ); // Not yet filled
        }
        labelIndex++;
        count = 0;
      }
    }
  }
  if ( count > 0 ) {
    if ( labelIndex < labels.length && count === labels[ labelIndex ] ) {
      newState.push( 1 ); // Correct
    } else if ( labelIndex < labels.length && count > labels[ labelIndex ] ) {
      newState.push( 2 ); // Incorrect
    } else {
      newState.push( 0 ); // Not yet filled
    }
    labelIndex++;
  }
  while ( labelIndex < labels.length ) {
    newState.push( 0 ); // Not yet filled
    labelIndex++;
  }
  rowLabelState[ rowIndex ] = newState;
}

export function updateColLabelState ( colIndex: number ): void {
  const col = playGrid.map( ( row ) => row[ colIndex ] );
  const labels = getColLabels()[ colIndex ];
  const newState: number[] = [];
  let labelIndex = 0;
  let count = 0;

  for ( let i = 0; i < col.length; i++ ) {
    if ( col[ i ] === 1 ) {
      count++;
    } else {
      if ( count > 0 ) {
        if ( labelIndex < labels.length && count === labels[ labelIndex ] ) {
          newState.push( 1 ); // Correct
        } else if ( labelIndex < labels.length && count > labels[ labelIndex ] ) {
          newState.push( 2 ); // Incorrect
        } else {
          newState.push( 0 ); // Not yet filled
        }
        labelIndex++;
        count = 0;
      }
    }
  }
  if ( count > 0 ) {
    if ( labelIndex < labels.length && count === labels[ labelIndex ] ) {
      newState.push( 1 ); // Correct
    } else if ( labelIndex < labels.length && count > labels[ labelIndex ] ) {
      newState.push( 2 ); // Incorrect
    } else {
      newState.push( 0 ); // Not yet filled
    }
    labelIndex++;
  }
  while ( labelIndex < labels.length ) {
    newState.push( 0 ); // Not yet filled
    labelIndex++;
  }
  colLabelState[ colIndex ] = newState;
  console.log( 'Col label state updated:', $state.snapshot( colLabelState ) );
}

export function getFinishedColLables ( colIndex: number ): number[] {
  console.log( 'getFinishedColLables called', colIndex );
  return [ 1, 2 ];
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

export function getRowLabels (): number[][] {
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
}

export function getColLabels (): number[][] {
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
}