var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrencyInput = function (_React$Component) {
  _inherits(CurrencyInput, _React$Component);

  function CurrencyInput() {
    _classCallCheck(this, CurrencyInput);

    return _possibleConstructorReturn(this, (CurrencyInput.__proto__ || Object.getPrototypeOf(CurrencyInput)).apply(this, arguments));
  }

  _createClass(CurrencyInput, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          value = _props.value,
          handleChange = _props.handleChange;


      return React.createElement("input", { type: "number", value: value, onChange: handleChange });
    }
  }]);

  return CurrencyInput;
}(React.Component);

var CurrencyConverter = function (_React$Component2) {
  _inherits(CurrencyConverter, _React$Component2);

  function CurrencyConverter(props) {
    _classCallCheck(this, CurrencyConverter);

    var _this2 = _possibleConstructorReturn(this, (CurrencyConverter.__proto__ || Object.getPrototypeOf(CurrencyConverter)).call(this, props));

    var rate = 0.89;
    _this2.state = {
      rate: rate,
      usd: 1,
      euro: 1 * rate
    };

    _this2.handleUsdChange = _this2.handleUsdChange.bind(_this2);
    _this2.handleEuroChange = _this2.handleEuroChange.bind(_this2);
    return _this2;
  }

  _createClass(CurrencyConverter, [{
    key: "toEuro",
    value: function toEuro(amount, rate) {
      return amount * rate;
    }
  }, {
    key: "toUsd",
    value: function toUsd(amount, rate) {
      return amount * (1 / rate);
    }
  }, {
    key: "isInputNan",
    value: function isInputNan(value) {
      if (Number.isNaN(value)) {
        this.setState({
          usd: "",
          euro: ""
        });
        return true;
      }

      return false;
    }
  }, {
    key: "handleUsdChange",
    value: function handleUsdChange(event) {
      var input = parseFloat(event.target.value);

      if (this.isInputNan(input)) {
        return;
      }

      var euro = this.toEuro(input, this.state.rate).toFixed(3);
      this.setState({
        usd: input,
        euro: euro
      });
    }
  }, {
    key: "handleEuroChange",
    value: function handleEuroChange(event) {
      var input = parseFloat(event.target.value);

      var usd = this.toUsd(input, this.state.rate).toFixed(3);
      this.setState({
        euro: input,
        usd: usd
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          rate = _state.rate,
          usd = _state.usd,
          euro = _state.euro;


      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "text-center p-3 mb-2" },
          React.createElement(
            "h2",
            { className: "mb2" },
            "Currency Converter"
          ),
          React.createElement(
            "h4",
            null,
            "USD: ",
            rate,
            " EURO"
          )
        ),
        React.createElement(
          "div",
          { className: "row text-center" },
          React.createElement(
            "div",
            { className: "col-12" },
            React.createElement(
              "span",
              { className: "mr-1" },
              "USD"
            ),
            React.createElement(CurrencyInput, { value: usd, handleChange: this.handleUsdChange }),
            React.createElement(
              "span",
              { className: "mx-3" },
              "="
            ),
            React.createElement(CurrencyInput, { value: euro, handleChange: this.handleEuroChange }),
            React.createElement(
              "span",
              { className: "ml-1" },
              "EURO"
            )
          )
        )
      );
    }
  }]);

  return CurrencyConverter;
}(React.Component);

ReactDOM.render(React.createElement(CurrencyConverter, null), document.getElementById("root"));