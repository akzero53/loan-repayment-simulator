import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

let instances = 0;

export default class RepaymentGraph extends React.Component {
  constructor(props) {
    super(props);

    this._ref = 'graph' + instances;
    this._currentChart = null;
    instances++;
  }

  componentDidMount() {
    this._renderGraph();
  }

  componentDidUpdate() {
    this._renderGraph();
  }

  render() {
    return (
      <div style={{ position: 'relative', width: 560, height: 420 }}>
        <canvas ref={this._ref} />
      </div>
    )
  }

  _renderGraph() {
    if (this._currentChart) {
      this._currentChart.destroy();
      this._currentChart = null;
    }

    const canvas = ReactDOM.findDOMNode(this.refs[this._ref]);
    const context2d = canvas.getContext('2d');

    const { simulations } = this.props;
    const datasets = simulations.map((simulation, index) => {
      const { rate, loan, repayment, maxMonth } = simulation;
      const result = this._calcNext(rate, loan, repayment, maxMonth, 0, []);

      return {
        label: Math.round(repayment / 10000) + '万円',
        data: result,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: index === 0 ? 'rgba(100, 0, 0, 0.3)' : (index === 1 ? 'rgba(0, 0, 100, 0.3)' : 'rgba(0, 100, 0, 0.3)')
      };
    });
    let maxLength = 0;
    datasets.forEach(dataset => {
      if (dataset.data.length > maxLength) maxLength = dataset.data.length;
    });
    const labels = [];
    for (let i = 0; i < maxLength; i++) labels.push(i + 1);

    this._currentChart = new Chart(context2d, {
      type: 'line',
      data: {
        labels,
        datasets,
      }
    });
  }

  _calcNext(rate, loan, repayment, maxMonth, count, result) {
    const rest = loan + loan * rate / 100 / 12 - repayment;
    result.push(rest);
    if (rest > loan) {
      if (count < maxMonth) {
        return this._calcNext(rate, rest, repayment, maxMonth, count + 1, result);
      } else {
        return result;
      }
    } else {
      const nextRest = rest + rest * rate / 100 / 12 - repayment;
      if (nextRest > 0) {
        if (count < maxMonth) {
          return this._calcNext(rate, rest, repayment, maxMonth, count + 1, result);
        } else {
          return result;
        }
      } else {
        result.push(0);
        return result;
      }
    }
  }
}
