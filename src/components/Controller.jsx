import React from 'react';

export default class Controller extends React.Component {
  constructor(props) {
    super(props);

    this._handleRateChange = this._handleRateChange.bind(this);
    this._handleLoanChange = this._handleLoanChange.bind(this);
    this._handleRepaymentChange = this._handleRepaymentChange.bind(this);
    this._handleMaxMonthChange = this._handleMaxMonthChange.bind(this);
  }

  render() {
    const { rate, loan, repayment, maxMonth } = this.props.selectedSimulation;

    return (
      <table>
        <tbody>
          <tr>
            <td><label>年率</label></td>
            <td><input value={rate} onChange={this._handleRateChange} /></td>
            <td><label>(%)</label></td>
          </tr>
          <tr>
            <td><label>借り入れ総額</label></td>
            <td><input value={loan} onChange={this._handleLoanChange} /></td>
            <td><label>(¥)</label></td>
          </tr>
          <tr>
            <td><label>返済額</label></td>
            <td><input value={repayment} onChange={this._handleRepaymentChange} /></td>
            <td><label>(¥)</label></td>
          </tr>
          <tr>
            <td><label>最大分割数</label></td>
            <td><input value={maxMonth} onChange={this._handleMaxMonthChange} /></td>
            <td><label>(回)</label></td>
          </tr>
        </tbody>
      </table>
    )
  }

  _isNumber(inputEvent) {
    return Number.isInteger(Number(inputEvent.target.value))
  }

  _handleRateChange(event) {
    if (this._isNumber(event) || event === '') this.props.setRate(event.target.value)
  }

  _handleLoanChange(event) {
    if (this._isNumber(event) || event === '') this.props.setLoan(event.target.value)
  }

  _handleRepaymentChange(event) {
    if (this._isNumber(event) || event === '') this.props.setRepayment(event.target.value)
  }

  _handleMaxMonthChange(event) {
    if (this._isNumber(event) || event === '') this.props.setMaxMonth(event.target.value)
  }
}
