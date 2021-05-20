import React from 'react';
import ReactDOM from 'react-dom';
import {VictoryLabel, VictoryChart, VictoryTheme, VictoryPolarAxis, VictoryStack, VictoryBar } from 'victory'
import * as _ from 'lodash'

const visualisation = (tab) => {
  const cate = Object.keys(tab)
  const pt = Object.values(tab)

  const a = 360/cate.length
  var points = []
  var directions = {}

  for (var i=0; i<cate.length; i++) {
    directions[a*i] = cate[i]
    points[i] = pt[i]
  }

  var lg_br = 0

  if (cate.length>10) {
    lg_br = 19
  }
  else {
    lg_br = 60
  }

  const mountNode = document.getElementById('visu');
  
  const orange = { base: "#ddd", highlight: "#4EA0A3" };
  
  const red = { base: "#4EA0A3"};
  
  const innerRadius = 35;
  
  class CompassCenter extends React.Component {
  
    render() {
      const { origin } = this.props;
      const circleStyle = {
        stroke: red.base, strokeWidth: 2, fill: orange.base
      };
      return (
        <g>
          <circle
            cx={origin.x} cy={origin.y} r={innerRadius} style={circleStyle}
          />
        </g>
      );
    }
  }
  
  class CenterLabel extends React.Component {
    render() {
      const { datum, active, color } = this.props;
      const categorie = directions[datum._x]
      var text = []
      const baseStyle = { fill: color.highlight, textAnchor: "middle" };
      var style = []
      if (categorie.includes(" ")) {
        var pos = categorie.search(" ")
        var ch1 = categorie.substr(0,(pos))
        var ch2 = categorie.substr(pos)
        text = [ ch1, ch2, `Ton score:`,`${Math.round(datum._y1*10)}%` ];
        style = [
          { ...baseStyle, fontSize: 8, fontWeight: "bold",  fontFamily: "Comfortaa" },
          { ...baseStyle, fontSize: 8, fontWeight: "bold",  fontFamily: "Comfortaa" },
          { ...baseStyle, fontSize: 7,  fontFamily: "Comfortaa" },
          { ...baseStyle, fontSize: 7, fontWeight: "bold",  fontFamily: "Comfortaa" }
        ];
      }
      else {
        text = [ `${directions[datum._x]}`, `Ton score:`,`${Math.round(datum._y1*10)}%` ];
        style = [
          { ...baseStyle, fontSize: 8, fontWeight: "bold",  fontFamily: "Comfortaa" },
          { ...baseStyle, fontSize: 7,  fontFamily: "Comfortaa" },
          { ...baseStyle, fontSize: 7, fontWeight: "bold",  fontFamily: "Comfortaa" },
        ];
      }    
  
      return active ?
        (
          <VictoryLabel
            text={text} style={style} x={175} y={175} renderInPortal
          />
        ) : null;
    }
  }
  
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = { wind: this.getWindData() };
    }
  
    getWindData() { 
      var i=0
      return _.keys(directions).map((d) => {
        const speed = points[i++];
        return {
          windSpeed: speed,
          windBearing: +d
        };
      });
    }
  
    render() {
      return (
        <div class="container">
          <VictoryChart
            polar
            theme={VictoryTheme.material}
            innerRadius={innerRadius}
            domainPadding={{ y: 10 }}
            events={[{
              childName: "all",
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    { target: "labels", mutation: () => ({ active: true }) },
                    { target: "data", mutation: () => ({ active: true }) }
                  ];
                },
                onMouseOut: () => {
                  return [
                    { target: "labels", mutation: () => ({ active: false }) },
                    { target: "data", mutation: () => ({ active: false }) }
                  ];
                }
              }
            }]}
          >
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickValues={_.keys(directions).map((k) => +k)}
              tickFormat={_.values(directions)}
              style={{
                axis: {stroke: "#D1343C"},
                tickLabels: {fontSize: 8, padding: 5, color:"#D1343C",  fontFamily: "Comfortaa"}
              }}
            />
            <VictoryStack>
              <VictoryBar
                style={{ data: {
                  fill: ({ active }) => active ? orange.highlight : orange.base,
                  width: lg_br
                } }}
                data={this.state.wind}
                x="windBearing"
                y="windSpeed"
                labels={() => ""}
                labelComponent={<CenterLabel color={orange}/>}
              />
            </VictoryStack>
            <CompassCenter/>
          </VictoryChart>
        </div>
      );
    }
   }
  
  
  ReactDOM.render(<App/>, mountNode)
};

export default visualisation;
