

  const width = 420;
  const height = 600;
  const margin = {
    top: 20,
    right: 20,
    bottom: 10,
    left: 95,
  }

  d3.csv('./data/alcohol.csv', d => {
    return {
      rank: +d.rank,
      country: d.country,
      perCapita: +d.perCapita,
    }
  }).then(data => {
    barChart(data)
  })


function barChart(data){
      const xMax = d3.max(data, d => d.perCapita)

      const xAvg = d3.mean(data, d => d.perCapita)
      console.log(xAvg)

      const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([margin.left, width - margin.right - margin.left])
        .nice()

      const yDomain = data.map(d => d.country)
      const yScale = d3.scaleBand()
        .domain(yDomain)
        .range([margin.top, height - margin.bottom])
        .padding(0.2)
      
      const yAxis = d3.axisLeft(yScale)
        .tickSizeOuter(0)
    
      const svg = d3.select('.chart').append('svg')
        .attr('height', height)
        .attr('width', width)

      const barsGroup = svg.append('g')
        .attr('class', 'bars')

      const bar = barsGroup.selectAll('g')
        .data(data)
        .join('g')
        .attr('class', 'bar')
      
      const barRect = bar.append('rect')
        .attr('y', d => yScale(d.country))
        .attr('x', d => margin.left)
        .attr('height', yScale.bandwidth())
        .attr('width', 0)
        .attr('fill', d => d.perCapita === xMax? '#ff9800' : '#d6c6b4')
        .transition()
        .duration(1000)
        .attr('width', d => xScale(d.perCapita))
      
      const barText = bar.append('text')
        .attr('x', d => xScale(d.perCapita))
        .attr('y', d => yScale(d.country) + 12)
        .text(d => d.perCapita)
        .attr('fill',  d => d.perCapita === xMax? '#ff9800' : '#967f65')
        .attr("font-size","11px")
        .style('font-family', 'Cabin')
        .attr('opacity', 0)
        .transition()
        .duration(1000)
        .attr('opacity', 1)
        .attr('x', d => xScale(d.perCapita) + margin.left + 5)


      svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${margin.left}, 0)`)
        .style("font-size","12px")
        .style('font-family', 'Cabin')
        .call(yAxis)

}


