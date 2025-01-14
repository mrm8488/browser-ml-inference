import './App.css';

import React from 'react';
import {inference} from './inference.js';
import {columnNames} from './inference.js';
import Chart from "react-google-charts";

class TextInputArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Enter text to classify emotion (Model trained for English)',
      data:columnNames,
      latency:0.0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {  
    inference(event.target.value).then( result => {
      this.setState({
        text : event.target.value,
        data:result[1],
        latency:result[0]
      });
    });
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">   
      <p>In-Browser NLP Inference</p>
      <Chart  
        width={'400px'}
        height={'200px'}
        chartType="BarChart"
        data={this.state.data}
        options={{
          chartArea: { width: '50%' },
          colors: ['purple'],
          backgroundColor: '#282c34',
          legend: { 
            textStyle: {color: 'white', fontSize: 8},
            labels: {fontColor:'white'}
          },
          vAxis: {
            textStyle: {
            color: 'white'
          }
          },
          hAxis: {
            minValue: 0,
            maxValue:100,
            textStyle: {
              color: 'white'
            }
          }
      }}
      />  
      <textarea rows="8" cols="24" className="App-textarea" name="message" 
       placeholder={this.state.text} autoFocus onChange={this.handleChange}>
      </textarea>
      {this.state.latency > 0 && 
       <div><font size="2">Inference Latency {this.state.latency} ms</font></div>
      }
      <div><font size="2"><a href="https://huggingface.co/bergum/xtremedistil-emotion">🤗 Emotion model</a></font></div>
      <div><font size="2"><a href="https://github.com/jobergum/emotion">Github repo</a></font></div>
      </header>
    </div>   
    );
  }
}
export default TextInputArea;
