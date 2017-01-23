import {Component, OnInit, ElementRef} from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  transform = 420;
  width = 840;
  height = 840;
  svg:any;
  data = [{
    value: 6,
    label: "hardware"
  }, {
    value: 5,
    label: "services"
  }, {
    value: 3,
    label: "misc"
  }, {
    value: 9,
    label: "software"
  }];

  constructor(
    private element:ElementRef) {}


  ngOnInit():void {

    this.svg = d3.select(this.element.nativeElement).append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.createLinesCirle({
      secondTickStart: 400,
      secondTickLength: -40,
      range: 360,
      domain: 360,
      rotate: 1
    });

    this.createLinesCirle({
      secondTickStart: 350,
      secondTickLength: -40,
      range: 360,
      domain: 120,
      rotate: 1
    });

    this.createLinesCirle({
      secondTickStart: 305,
      secondTickLength: -120,
      range: 360 * 2,
      domain: 360 * 2,
      rotate: 2
    });

    let arc = d3.arc()
      .innerRadius(270)
      .outerRadius(260)
      .startAngle(0);

    this.svg.append("g")
      .attr('transform',`translate(${this.transform}, ${this.transform})`)
      .append("path")
      .datum({endAngle: 2 * Math.PI})
      .style("fill", "#455797")
      .attr("d", arc);

    let circle = this.svg.append("g")
      .attr('transform',`translate(${this.transform}, ${this.transform})`);

    let scaleX = d3.scaleLinear()
      .range([0, 360])
      .domain([0, 4]);

    let radiance = 2 * Math.PI / 360;

    circle
      .append("circle")
      .attr("r", 90)
      .attr("fill", "#455797");

    circle
      .append("text")
      .text("drone".toUpperCase())
      .attr("dy", ".35em")
      .style("text-anchor", "middle");
    let small_circle_radius = 230;

    let small_circle = this.svg.selectAll(".small-circle")
      .data(this.data)
      .enter()
      .append("g")
      .attr("class", "small-circle")
      .attr("transform", (d, i) => `translate(${small_circle_radius*Math.sin(scaleX(i) * radiance) + this.transform}, ${-small_circle_radius*Math.cos(scaleX(i) * radiance) + this.transform})`)



    let color = d3.scaleOrdinal(d3.schemeCategory10);

    small_circle
      .append("circle")
      .attr("r", 18)
      .attr("fill", "#fff")
      .attr("stroke", (d, i) => color(i))
      //.attr("transform", (d, i) => `translate(${small_circle_radius*Math.sin(scaleX(i) * radiance)}, ${-small_circle_radius*Math.cos(scaleX(i) * radiance)})`)

    small_circle
      .append("circle")
      .attr("r", 15)
      .attr("fill", (d, i) => color(i))
      .attr("stroke", (d, i) => color(i))
      //.attr("transform", (d, i) => `translate(${small_circle_radius*Math.sin(scaleX(i) * radiance)}, ${-small_circle_radius*Math.cos(scaleX(i) * radiance)})`)


    small_circle
      .append("text")
      .text((d) => d.value)
      .attr("dy", ".35em")
      .style("text-anchor", "middle");




    let line_container = this.svg.append("g")
      .attr("transform", `translate(${this.transform}, ${this.transform})`)
      .selectAll("line")
      .data(this.data)
      .enter()

    line_container
      .append("line")
      .attr("x1", (d, i) => 100*Math.sin(scaleX(i) * radiance))
      .attr("x2", (d, i) => 110*Math.sin(scaleX(i) * radiance))
      .attr("y1", (d, i) => -100*Math.cos(scaleX(i) * radiance))
      .attr("y2", (d, i) => -110*Math.cos(scaleX(i) * radiance))
      .attr("stroke", (d, i) => color(i))

    line_container
      .append("text")
      .text((d) => d.label.toUpperCase())
      .attr("dy", ".35em")
      .attr("dx", (d, i) => scaleX(i) < 180 ? 115 : -115)
      .style("text-anchor", (d, i) => scaleX(i) < 180 ? "start" : "end")
      .attr("transform", (d, i) => `rotate(${(scaleX(i) < 180 ? scaleX(i) - 90 : scaleX(i) + 90)})`)
      .style("stroke", (d, i) => color(i));

    line_container
      .append("line")
      .attr("x1", (d, i) => (120 + line_container._parents[0].children[4 + i].clientWidth)*Math.sin(scaleX(i) * radiance))
      .attr("x2", (d, i) => 220*Math.sin(scaleX(i) * radiance))
      .attr("y1", (d, i) => -(120 + line_container._parents[0].children[4 + i].clientWidth)*Math.cos(scaleX(i) * radiance))
      .attr("y2", (d, i) => -220*Math.cos(scaleX(i) * radiance))
      .attr("stroke", (d, i) => color(i));
  }

  private createLinesCirle(settings:any) {

    let secondScale = d3.scaleLinear()
      .range([0, settings.range])
      .domain([0, settings.domain]);

    let face = this.svg.append('g')
      .attr('transform',`translate(${this.transform}, ${this.transform})`);

    face.selectAll('.second-tick')
      .data(d3.range(0, settings.range)).enter()
      .append('line')
      .attr('class', 'second-tick')
      .attr('x1',0)
      .attr('x2',0)
      .attr('y1', settings.secondTickStart)
      .attr('y2', settings.secondTickStart + settings.secondTickLength)
      .attr('transform',function(d){
        return `rotate(${secondScale(d)/settings.rotate})`;
      });
  }
}
