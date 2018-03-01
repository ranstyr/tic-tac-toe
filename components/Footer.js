var React = require('react');
var PropTypes = React.PropTypes;

var Footer = React.createClass({
    render: function() {
      var status;
      if (Number.isInteger(this.props.winner)) {
        status = "Player " + (this.props.player === 2?'x':'o') + " wins";
      }
      else if (this.props.draw === true) {
          status = "The match is a draw ";
      }
      else {
          status = "It's " + (this.props.player === 1?'x':'o') + " turn";
      }
        return (
            <div className={style['game__box']}>
                <p className={style['state']}>{status}</p>
            </div>
        );
    }

});

module.exports = Footer;
