import React from "React";

var Cell = React.createClass({

    render: function () {
        var itemClass ='game__item' +  (Number.isInteger(this.props.value) ? (this.props.value === 1 ? ' x': ' o') : '');
        return (
          <div className={itemClass} onClick={this.props.onCellClick}></div>
        );
    }

});

module.exports = Cell ;
