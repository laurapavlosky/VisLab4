d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{

    console.log('cities', data);

    const margin = ({top: 20, right: 20, bottom: 20, left: 20});
    const width = 650 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
    const svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // add values to min and max for padding
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d=> d.Income))
        .range([0,width]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d=> d.LifeExpectancy))
        .range([height,0]);

    const colorScale = d3.scaleOrdinal()
        .range(d3.schemeTableau10);
    
    const sizeScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Population))
        .range([5,25])


    svg.selectAll()
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.Income))
        .attr('cy', d => yScale(d.LifeExpectancy))
        .attr('r', d=> sizeScale(d.Population))  
        .attr('fill', d=> colorScale(d.Region))
        .attr('stroke', 'black')
        .attr('opacity', 0.8)
        .on('mouseover', function(event,d){
            const pos = d3.pointer(event, window);
            const tooltip = 
            d3.select('.tooltip')
                .style('left', pos + "px")
                .style("top", pos + "px")
                .select('#value')
                .style('text-align', 'center')
                .text(d.Country + '\n' +d.LifeExpectancy + '\n'+ d.Income+ '\n' + d.Region + '\n' + d.Population);
            d3.select('.tooltip').style('display', 'block')
            console.log(tooltip);
            
        })
        .on('mouseout', function(d) {
            d3.select('.tooltip').classed('hidden', true)
        })
        // add tooltip?
      

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5,'s');

    const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(5,'s');

    svg.append('g')
        .attr('class', 'axis x-axis')
        .call(xAxis)
        .attr('transform', `translate(0, ${height})`);
        

    svg.append('g')
        .attr('class', 'axis y-axis')
        .call(yAxis);


    var legend = svg.selectAll()
        .data(['Sub-Saharan Africa', 'East Asia & Pacific', 'America' , 'South Asia', 'Middle East & North Africa', 'Europe & Central Asia'])
        .enter()
        .append('rect')
        .attr('x', width -100)
        .attr('y', function(d,i) {return height - 20*i})
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', d => colorScale(d))

    legend.append('text')
        .attr('x', function(d) {return width - 95})
        .attr('y', function(d,i) {return height - 20*i })
        //.attr('dy', '.35em')
        .text(function(d) {return d});
        


 

    
})