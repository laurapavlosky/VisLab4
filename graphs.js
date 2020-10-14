// loading data
d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{

    console.log('cities', data);

    // create margins, height, and width of svg
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
    // scales
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

    // creating circles for data
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
        
        // tooltip functionality
        .on('mouseover', function(event,d){
            const pos = d3.pointer(event, window);
            const tooltip = 
            d3.select('.tooltip')
                .style('left', pos[0] + "px")
                .style("top", pos[1] + "px")
                .select('.tooltiptext')
                .html(`<div>Country: ${d.Country}<br>Income: ${d.Income}<br>Life Expectancy: ${d.LifeExpectancy}<br>Population: ${d.Population}<br>Region: ${d.Region}</div>`)
            d3.select('.tooltip').style('display', 'block')
            console.log(tooltip);
            
        })
        .on('mouseout', function(d) {
            d3.select('.tooltip').style('display', 'none');
        })

      
    // creating axis
    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5,'s');

    const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(5,'s');

    // rendering axis
    svg.append('g')
        .attr('class', 'axis x-axis')
        .call(xAxis)
        .attr('transform', `translate(0, ${height})`);

    svg.append('g')
        .attr('class', 'axis y-axis')
        .call(yAxis);
    
    // axis labels
    svg.append('text')
        .attr('x', width - 50)
        .attr('y', height -10)
        .attr('font-size', 14)
        .text('Income');

    svg.append('text')
        .attr('x', 10)
        .attr('y', 10)
        .attr('font-size', 14)
        .text("Life Expectancy")
       
   
    // creating legend
    // boxes for legend
    svg.selectAll('rectangle')
        .append('g')
        .data(['Sub-Saharan Africa', 'East Asia & Pacific', 'America' , 'South Asia', 'Middle East & North Africa', 'Europe & Central Asia'])
        .enter()
        .append('rect')
        .attr('x', width - 250)
        .attr('y', function(d,i) {
            return height - 80 - 20*i
        })
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', d => colorScale(d))
        .attr('stroke', '#000')

    // text for legend
    svg.selectAll('rectangle')
        .append('g')
        .data(['Sub-Saharan Africa', 'East Asia & Pacific', 'America' , 'South Asia', 'Middle East & North Africa', 'Europe & Central Asia'])
        .enter()
        .append('text')
        .attr('x', width - 220)
        .attr('y', function(d,i) {return height - 65 - 20*i})
        .text(d => d)
        .attr('text-anchor', 'right');



 

    
})