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

    this.svg.append("g")
      .attr('transform',`translate(${this.transform}, ${this.transform})`)
      .append("circle")
      .attr("r", 90)
      .attr("fill", "#455797")

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
