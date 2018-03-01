import React from "React";
import Cell from "./Cell";


let Board = React.createClass({
    render: function () {
        let gameCells = this.props.table.map(function (table, i) {
              return (
                  <Cell onCellClick={this.props.onCellClick.bind(null,i)} key={i} value={table}/>
                  );
            },this);
        return (
            <div className="game__body">
               {gameCells}
            </div>
        );
    }

});


module.exports = Board;
