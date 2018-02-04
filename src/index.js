import React from 'react'
import ReactDOM from 'react-dom'

import Controller from './components/Controller.jsx'
import RepaymentGraph from './components/RepaymentGraph.jsx'

const reactRootElement = document.getElementById('react-root')

class Application extends React.Component {
  constructor(props) {
    super(props);

    this._setRate = this._setRate.bind(this);
    this._setLoan = this._setLoan.bind(this);
    this._setRepayment = this._setRepayment.bind(this);
    this._setMaxMonth = this._setMaxMonth.bind(this);
  }

  componentWillMount() {
    this.setState({
      simulations: [
        {
          rate: 12,
          loan: 1800000,
          repayment: 20000,
          maxMonth: 36,
        },
        {
          rate: 12,
          loan: 1800000,
          repayment: 40000,
          maxMonth: 36,
        },
        {
          rate: 12,
          loan: 1800000,
          repayment: 60000,
          maxMonth: 36,
        }
      ],
      selectedSimulationIndex: 0,
    })
  }

  render() {
    const { simulations, selectedSimulationIndex } = this.state

    return (
      <div>
        <section style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
          <div>
            {simulations.map((simulation, index) => {
              return <div key = {'controller_' + index} style={{
                backgroundColor: index === 0 ? 'rgba(100, 0,0,0.3)' : (index === 1 ? 'rgba(0,0,100,0.3' : 'rgba(0,100,0,0.3'),
                margin: 8,
              }}>
                <Controller
                  selectedSimulation = {simulation}
                  setRate = {(value) => this._setRate(value, index)}
                  setLoan = {(value) => this._setLoan(value, index)}
                  setRepayment = {(value) => this._setRepayment(value, index)}
                  setMaxMonth = {(value) => this._setMaxMonth(value, index)}
                />
              </div>
            })}
          </div>
          <RepaymentGraph
            simulations = {simulations}
          />
        </section>
        <section style={{ fontSize: 12, color: '#666666' }}>
          <p>注意</p>
          <p>このシミュレータを使って起こったいかなる問題も、当サイトでは責任を負いません。</p>
          <p>サイトの内容は予告なく更新されることがあります。</p>
        </section>
      </div>
    )
  }

  _setRate(value, index) {
    const { simulations, selectedSimulationIndex } = this.state;
    const nextSimulations = [].concat(simulations);
    nextSimulations[index].rate = value;
    this.setState({ simulations: nextSimulations });
  }

  _setLoan(value, index) {
    const { simulations, selectedSimulationIndex } = this.state;
    const nextSimulations = [].concat(simulations);
    nextSimulations[index].loan = value;
    this.setState({ simulations: nextSimulations });
  }

  _setRepayment(value, index) {
    const { simulations, selectedSimulationIndex } = this.state;
    const nextSimulations = [].concat(simulations);
    nextSimulations[index].repayment = value;
    this.setState({ simulations: nextSimulations });
  }

  _setMaxMonth(value, index) {
    const { simulations, selectedSimulationIndex } = this.state;
    const nextSimulations = [].concat(simulations);
    nextSimulations[index].maxMonth = value;
    this.setState({ simulations: nextSimulations });
  }
}

ReactDOM.render(<Application />, reactRootElement)
