var React = require("react");
var PropTypes = React.PropTypes;

class Header extends React.Component {
  static propTypes = {
    winner: PropTypes.string.isRequired,
    draw: PropTypes.bool.isRequired,
    player: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    let status;
    const winner = this.props.winner;
    if (Number.isInteger(winner)) {
      status = "Player " + (this.props.player === 2 ? "x" : "o") + " wins";
    } else if (this.props.draw === true) {
      status = "The match is a draw ";
    } else {
      status = "It's " + (this.props.player === 1 ? "x" : "o") + " turn";
    }
    return (
      <div className='game__box' >
        <h2 className='state'>{status}</h2>
      </div>
    );
  }
}

module.exports = Header;
