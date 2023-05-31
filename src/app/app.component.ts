import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'd3';

  data:any = {
    "centerTxt": "1024.77M",
    "data": [
      {
        "color": "#00B7FF",
        "name": "Asset 15 Feb",
        "value": 0.21
      },
      {
        "color": "#A929E5",
        "name": "Asset 15 Feb 01",
        "value": 0.0
      },
      {
        "color": "#FF4FD8",
        "name": "keyboard",
        "value": 0.0
      },
      {
        "color": "#1248B4",
        "name": "thrymr Software",
        "value": 0.0
      },
      {
        "color": "#FF8282",
        "name": "Asset 16 Feb",
        "value": 0.02
      },
      {
        "color": "#FFB84F",
        "name": "Asset 17 Feb 02",
        "value": 14.57
      },
      {
        "color": "#26E595",
        "name": "Asset 17 Feb up",
        "value": 54.88
      },
      {
        "color": "#FF5959",
        "name": "Asset12",
        "value": 875.03
      },
      {
        "color": "#C2D212",
        "name": "Asset123",
        "value": 5.03
      },
      {
        "color": "#DC0000",
        "name": "Asset2",
        "value": 75.03
      }
    ]
  }
  

  ngOnInit(): void {
    this.createSvg()
    this.createLegend(this.data?.data);
    this.createColors(this.data?.data);
   this.drawChart();
  }
 
  

  
  private margin = { top: 3, right: 10, bottom: 10, left: 15 };
  private width = 600;
  private height = 500;
  private svg: any;
  private colors: any;
  private radius = Math.min(this.width, this.height) / 2 ;
  private createLegend(data: any) {
    var w = 500,
      h = 500,
      r = 140,
      inner = 180 / 2;
    var legend = this.svg
      .append("svg")
      .attr("class", "legend")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")

      .attr("transform", function (d: any, i: any) {
        return "translate(" + (r + 20) + "," + i * 20 + ")";
      });

    legend
      .append("rect")
      .attr("x", 50)
      .attr("y", 3)
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", (data: any, i: any) => {
        return data.color;
      });

    legend
      .append("text")
      .attr("x", 70)
      .attr("y", 10)
      .attr("dy", ".35em")
      .attr("fill", "#ffffff")
      .text((data: any) => {
        if (data.name.includes("_")) {
          let a = data.name.split("_").join(" ");
          return a;
        } else {
          return data.name;
        }
      });
  }
  private createSvg(): void {
    this.svg = d3
      .select('#map')
      .append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .append("g")
      .attr(
        "transform",
        "translate(" + (this.width / 2 - 100) + "," + this.height / 2 + ")"
      );
  }
  private createColors(data: any): void {
    let index = 0;
    const defaultColors: any = [];
    const colorsRange: any = [];
    data.forEach((element: any) => {
      if (element.color) colorsRange.push(element.color);
      else {
        colorsRange.push(defaultColors[index]);
        index++;
      }
    });
    this.colors = d3
      .scaleOrdinal()
      .domain(data.map((d: any) => d.color.toString()))
      .range(colorsRange);
  }
  
  private drawChart(): void {
    var pie = d3
      .pie().startAngle(-90 * (Math.PI/180)).endAngle(90 * (Math.PI/180)).padAngle(.02)
      .sort(null)
      .value((d: any) => {
        return d.value;
      });
    var data_ready: any = pie(this.data.data);

    var arc = d3
      .arc()
      .innerRadius(this.radius * 0.5)
      .outerRadius(this.radius * 0.8);

    var outerArc = d3
      .arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius * 0.9);

    let div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
      this.svg.append("svg:text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("style","font-family:Ubuntu")
    .attr("font-size","40")
    .attr("fill","#5CB85C")
    .text(this.data?.centerTxt);
    
    var path: any = this.svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("class", "tooltip-donut")
      .attr("d", arc)
      .attr("fill", (d: any) => this.colors(d.data.value))
      .attr("stroke", "white")
      .style("stroke-width", "0px")
      .style("opacity", 0.7)
      .on("mousemove", function (d: any, i: any) {
        div.style("opacity", 0.9);

        div
          .html(
            "<span>" +
              i.data.name +
              "</span><br>" +
              "<span>" +
              i.value +
              "</span>"
          )
          .style("left", d.pageX - 50 + "px")
          .style("top", d.pageY - 50 + "px")
          .style("color", "#ffffff")
          .style("font-weight", 700)
          .style("background", i.data.color)
          .style("opacity", 0.8);
      })
      .on("mouseout", function (d: any) {
        div.style("opacity", 0);
      });

    this.svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text((d: any) => {
        return d.data.value;
      })
      .attr("font-size", "14px")
      .attr("font-weight", "600")
      .attr("fill", "#ffffff")

      .attr("transform", (d: any) => {
        var pos = arc.centroid(d);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", (d: any) => {
        var midangle = d.startAngle;
        return "middle";
      });

    // if (this.data?.centerTxt) {
    //   this.svg
    //     .append("text")

    //     .text(this.data?.centerTxt)
    //     .attr("x", "1")
    //     .attr("y", "1")
    //     .style("text-anchor", "middle")
    //     .style("font-weight", "600")
    //     .style("font-size", "30px")
    //     .style("dominant-baseline", "central")
    //     .attr("fill", "#000000");
    // }
    if (this.data?.centerTxt) {
      this.svg
        .append("text")

        .text('HIGH')
        .attr("x", 0)
        .attr("y", -35)
        .style("text-anchor", "middle")
        .style("font-size", "24px")
        .style("dominant-baseline", "central")
        .attr("fill", "#ffffff");
    }
  }



  
}
