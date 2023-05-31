import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3'

@Component({
  selector: 'app-horizontal-bar-charts',
  templateUrl: './horizontal-bar-charts.component.html',
  styleUrls: ['./horizontal-bar-charts.component.css']
})
export class HorizontalBarChartsComponent implements OnInit {
  
 margin:any = {top: 20, right: 20, bottom: 30, left: 80};
svgWidth:any = 720
svgHeight:any = 300;
height:any = this.svgHeight- this.margin.top- this.margin.bottom
 width:any = this.svgWidth -this. margin.left - this.margin.right;
 sourceNames:any = []
  sourceCount:any = [];

ngOnInit(): void {
  console.log('mrssa');
  this.creatingTheXAndyAxies()
  
}


// data:any
creatingTheXAndyAxies(){
  let data:any = {
    "FACEBOOK": 10,
    "GITHUB"  : 44,
    "GOOGLE"  : 64,
    "TWITTER" : 17,
    "WEIBO"   : 19
}
  let x = d3.scaleLinear().rangeRound([0, this.width]),
    y = d3.scaleBand().rangeRound([0, this.height]).padding(0.1);
    for(let key in data){
     
      
          this.sourceNames.push(key);
          this.sourceCount.push(parseInt(data[key]));
      
  }

  // [0, d3.max(sourceCount, function(d) { return d; })]
  x.domain( [0, 40]);
y.domain(this.sourceNames);
let svg:any = d3.select("#horzontalbar").append("svg");
svg.attr('height',this.svgHeight)
   .attr('width',this.svgWidth);
   svg = svg.append("g")
         .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

svg.append("g")
    .attr("transform", "translate(0, " + this.height + ")")
    .call(d3.axisBottom(x))
    ;

    svg.append("g")
    .call(d3.axisLeft(y))
    ;

    let bars = svg.selectAll('.bar')
    .data(this.sourceNames)
    .enter()
    .append("g");

    bars.append('rect')
    .attr('class', 'bar')
    .attr("x", function(d:any) { return 0; })
    .attr("y", function(d:any) { return y(d); })
    .attr("width", function(d:any){return x(data[d])})
    .attr("height", function(d:any) { return y.bandwidth(); });


    bars.append("text")
    .text(function(d:any) { 
        // return data[d];
        return data[d]
    })
    .attr("x", function(d:any){
        return x(data[d]) + 15;
    })
    .attr("y", function(d:any){
        
          return   50+y.bandwidth() * (0.5 + 0.1);

        
         
    })
    .attr("font-family" , "sans-serif")
    .attr("font-size" , "14px")
    .attr("fill" , "black")
    .attr("text-anchor", "middle");


    

    


  
  
}

}
