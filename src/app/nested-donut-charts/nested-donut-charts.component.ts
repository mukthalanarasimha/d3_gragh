import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3'

@Component({
  selector: 'app-nested-donut-charts',
  templateUrl: './nested-donut-charts.component.html',
  styleUrls: ['./nested-donut-charts.component.css']
})
export class NestedDonutChartsComponent implements OnInit {
   dataset1:any = [
    { count: 10 }, 
    { count: 20 },
    { count: 30 },
    { count: 40 }
  ];
  
   dataset2:any = [
    { count: 5 }, 
    { count: 15 }, 
    { count: 25 },
    { count: 35 },
    { count: 45 }
  ];
  width = 400;
   height = 400;
   donutWidth = 75;
   radius1 = Math.min(this.width, this.height) / 2;
   radius2 = this.radius1 - this.donutWidth;

  ngOnInit(): void {
    console.log('call with ngoint');
    this.nestedDonut()
    
  }


  nestedDonut(){
    var color1 = d3.scaleOrdinal(d3.schemeCategory10);
        var color2 =  d3.scaleOrdinal(d3.schemeCategory10);
    var svg = d3.select('#nesteddonut')
          .append('svg')
          .attr('width', this.width)
          .attr('height', this.height);
        var svg1 = svg.append('g')
          .attr('transform', 'translate(' + (this.width / 2) + 
            ',' + (this.height / 2) + ')');
        var svg2 = svg.append('g')
          .attr('transform', 'translate(' + (this.width / 2) + 
            ',' + (this.height / 2) + ')');

            var arc1:any = d3.arc()
          .innerRadius(this.radius1 - this.donutWidth)  
          .outerRadius(this.radius1);
        var arc2:any = d3.arc()
          .innerRadius(this.radius2 - this.donutWidth)  
          .outerRadius(this.radius2);
          var pie = d3.pie()
          .value(function(d:any) { return d.count; })
          .sort(null);




          
          var path1 = svg1.selectAll('path')
          .data(pie(this.dataset1))
          .enter()
          .append('path')
          .attr('d', arc1)
          .attr('fill', function(d:any, i:any) { 
            return color1(i);
          });
        var path2 = svg2.selectAll('path')
          .data(pie(this.dataset2))
          .enter()
          .append('path')
          .attr('d', arc2)
          .attr('fill', function(d:any, i:any) { 
            return color2(i);
          });
   


  }

}
