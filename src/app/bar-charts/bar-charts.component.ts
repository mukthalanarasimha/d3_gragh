import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent implements OnInit {
   margin:any = 100;
   width:any = 750 - this.margin * 2;
   height:any = 600 - this.margin * 2;
   private svg: any;
   highestValue: string= '50'

   data:any = [
    {
      'color': "#9954E6",
'name': "abc-1",
'value': "200"
    },
    {
      
"color": "#63adfeb3",
"name": "abc-2",
"value": "100"

    },
    {
      "color": "#533a84",
      "name": "abc-3",
      "value": "500"

    },
    {
      
"color": "#dd8050c4",
"name": "abc-4",
"value": "300"

    },
    {
      
'color': "#BF60C4",
"name": "abc-5",
'value': "50"

    }





   
   ]








   ngOnInit(): void {
    this.createSvg()
    this.drawBars(this.data);
     
   }


   createSvg(): void {
    this.svg = d3
      .select("div#chart")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${this.width + this.margin * 2} ${this.height + this.margin * 2}`
      )

      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

   drawBars(data: any[]): void {
    // Creating X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);
     

    // Drawing X-axis on the DOM
    // this.svg
    //   .append("g")
    //   .attr("transform", "translate(0," + this.height + ")")
    //   .call(d3.axisBottom(x))
    //   .selectAll("text")
    //   // .attr('transform', 'translate(-10, 0)rotate(-45)')
    //   // .style('text-anchor', 'end')
    //   .style("font-size", "14px");
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickSize(0));

    // Creaate Y-axis band scale
    // const y = d3
    //   .scaleLinear()
    //   .domain([0, Number(this.highestValue) + 50])
    //   .range([this.height, 0]);
    var y = d3.scaleLinear()
    .domain([0, 40])
    .range([ this.height, 0 ]);
 

    // Draw the Y-axis on the DOM
    this.svg
      .append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "14px");

    //Create and fill the bars
    this.svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x",(d:any) => x(d.name))
      .attr("y", (d:any) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d:any) =>
        y(d.value) < this.height ? this.height - y(d.value) : this.height
      ) // this.height
      .attr("fill", (d:any) => d.color);

    this.svg
      .selectAll("text.bar")
      .data(data)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "#70747a")
      // .attr("x", (d:any) => x({'narrs'}) - 5)
      .attr("y", (d:any) => y(d.value) - 5)
      .text((d:any) => Math.round(d.value * 100) / 100);
    this.svg.append("g")
    .selectAll("g")
   
    // .data(data)
    // .enter()
    // .append("g")
    //   .attr("transform", function(d:any) { return "translate(" + x(d.name) + ",0)"; })
    // .selectAll("rect")
    // .data(data)
    // .enter().append("rect")
    //   .attr("x", function(d:any) { return xSubgroup(d.key); })
    //   .attr("y", function(d:any) { return y(d.value); })
    //   .attr("width", xSubgroup.bandwidth())
    //   .attr("height", function(d) { return height - y(d.value); })
    //   .attr("fill", function(d) { return color(d.key); });
  }



}
