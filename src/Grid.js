import React, { Component } from 'react';
import Cell from './Cell';
import { FARM_SIZE } from './constants';
export default class Grid extends Component {
  getGrid(size) {
    const grid = [];
    for (let i = 0; i <= size; i++) {
      grid.push(this.getRow(i, size));
    }
    return (
      <table>
        <tbody>{grid}</tbody>
      </table>
    );
  }

  getRow = (rowNumber, size) => {
    const cells = [];

    for (let i = 0; i <= size; i++) {
      cells.push(
        <td key={`${rowNumber}-${i}`}>
          <Cell position={{ x: rowNumber, y: i }} />
        </td>
      );
    }
    return <tr key={`row-${rowNumber}`}>{cells}</tr>;
  };

  render() {
    return <div className="grid center">{this.getGrid(FARM_SIZE)}</div>;
  }
}
