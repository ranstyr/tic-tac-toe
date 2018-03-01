/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from "react";
import Header from "../../components/Header";
import Board from "../../components/Board";

const title = "tic-tac-toe game between 2 players";

class HomePage extends React.Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    let database = firebase.database();

    // Initialize Firebase
    this.state = {
      StartScreen: true,
      table: ["", "", "", "", "", "", "", "", ""],
      player: Math.floor(Math.random() * 2) + 1,
      winner: "",
      draw: false
    };
  }

  componentDidMount() {
    document.title = title;
  }

  writeData(state) {
    const { StartScreen, table, player, winner, draw } = state;
    return firebase
      .database()
      .ref("state")
      .set({
        StartScreen,
        table,
        player,
        winner,
        draw
      });
  }

  onCellClick(tableIndex) {
    if (this.state.table[tableIndex] === "" && this.state.winner === "") {
      this.setState({
        table: this.updateTable(tableIndex, this.state.player),
        player: this.nextPlayer()
      });
      this.winCheck();
      this.drawCheck();
    }
  }

  getInitialState() {
    return {
      StartScreen: true,
      table: ["", "", "", "", "", "", "", "", ""],
      player: Math.floor(Math.random() * 2) + 1,
      winner: "",
      draw: false
    };
  }
  // change player turn
  nextPlayer() {
    return this.state.player === 1 ? 2 : 1;
  }
  // update table with current player number
  updateTable(tableIndex, player) {
    var table = this.state.table;
    table[tableIndex] = player;
    return table;
  }

  //check win conditions
  winCheck() {
    let sumRow, sumColumn, sumDiag1, sumDiag2;

    // check diagonal
    sumDiag1 = this.state.table[0] + this.state.table[4] + this.state.table[8];
    sumDiag2 = this.state.table[2] + this.state.table[4] + this.state.table[6];
    if (sumDiag1 === 3 || sumDiag1 === 6) {
      this.setState({
        winner: sumDiag1 === 3 ? 1 : 2
      });
    }
    if (sumDiag2 === 3 || sumDiag2 === 6) {
      this.setState({
        winner: sumDiag1 === 3 ? 1 : 2
      });
    }

    //check rows
    for (let i = 0; i <= 6; i += 3) {
      sumRow =
        this.state.table[i] + this.state.table[i + 1] + this.state.table[i + 2];
      if (sumRow === 3 || sumRow === 6) {
        this.setState({
          winner: sumRow === 3 ? 1 : 2
        });
      }
    }

    //check columns
    for (let i = 0; i < 3; i++) {
      sumColumn =
        this.state.table[i] + this.state.table[i + 3] + this.state.table[i + 6];
      if (sumColumn === 3 || sumColumn === 6) {
        this.setState({
          winner: sumColumn === 3 ? 1 : 2
        });
      }
    }
  }
  //check if table is filled
  drawCheck() {
    if (this.state.table.indexOf("") < 0) {
      this.setState({
        draw: true
      });
    }
  }

  render() {
    return (
      <div className="content">
        <h1>Welcome!</h1>
        <div className="game">
          <div className="container">
            <Header
              player={this.state.player}
              winner={this.state.winner}
              draw={this.state.draw}
            />
            <Board
              table={this.state.table}
              onCellClick={this.onCellClick.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
