class CurrencyInput extends React.Component {
  render() {
    const { value, handleChange } = this.props;

    return <input type="number" value={value} onChange={handleChange} />;
  }
}

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    const rate = 0.89;
    this.state = {
      rate: rate,
      usd: 1,
      euro: 1 * rate,
    };

    this.handleUsdChange = this.handleUsdChange.bind(this);
    this.handleEuroChange = this.handleEuroChange.bind(this);
  }

  toEuro(amount, rate) {
    return amount * rate;
  }

  toUsd(amount, rate) {
    return amount * (1 / rate);
  }

  isInputNan(value) {
    if (Number.isNaN(value)) {
      this.setState({
        usd: "",
        euro: "",
      });
      return true;
    }

    return false;
  }

  handleUsdChange(event) {
    const input = parseFloat(event.target.value);

    if (this.isInputNan(input)) {
      return;
    }

    const euro = this.toEuro(input, this.state.rate).toFixed(3);
    this.setState({
      usd: input,
      euro: euro,
    });
  }
  handleEuroChange(event) {
    const input = parseFloat(event.target.value);

    const usd = this.toUsd(input, this.state.rate).toFixed(3);
    this.setState({
      euro: input,
      usd: usd,
    });
  }

  render() {
    const { rate, usd, euro } = this.state;

    return (
      <div className="container">
        <div className="text-center p-3 mb-2">
          <h2 className="mb2">Currency Converter</h2>
          <h4>USD: {rate} EURO</h4>
        </div>
        <div className="row text-center">
          <div className="col-12">
            <span className="mr-1">USD</span>
            <CurrencyInput value={usd} handleChange={this.handleUsdChange} />
            <span className="mx-3">=</span>
            <CurrencyInput value={euro} handleChange={this.handleEuroChange} />
            <span className="ml-1">EURO</span>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<CurrencyConverter />, document.getElementById("root"));
