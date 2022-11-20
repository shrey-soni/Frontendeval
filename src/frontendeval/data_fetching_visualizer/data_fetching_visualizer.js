import React from 'react';

class DataFetchingVisualizer extends React.Component {
  constructor(_) {
    super();
    this.api = "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new";
    this.state = {
      hashMap: null,
    }
  }

  // Quota ended
  componentDidMount() {
    (async () => {
      const frequencyMap = {};
      const request = await fetch(this.api);
      const response = await request.text();
      const numbers = response.trim().split("\n").map(Number);
      console.log(numbers)
      numbers.forEach((number) => {
        if (!frequencyMap[number]) {
          frequencyMap[number] = 1;
        } else {
          frequencyMap[number]++;
        }
      });
      this.setState({ hashMap: frequencyMap });
    })();
  }

  render() {
    if (this.state.hashMap) {
      return (<div className="data_visualizer">
        <div className="title">Data visualizer</div>
        <Plotter  hm={this.state.hashMap} />
      </div>);
    }
    return (<div>Loading...</div>)
  }

}

function Plotter({hm}){
  console.log(hm)
  return (<div className="plotter">
  <div className="graph">
    <div className="y_axis">
      {[0,10,20,30].map((item)=>{
        return <div key={item}>{item}</div>
      })}
    </div>
    <div className="x_axis">
    {
      
    }
    </div>
  </div>
</div>);
}


export { DataFetchingVisualizer }