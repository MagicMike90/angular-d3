import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as topojson from 'topojson';

@Component({
  selector: 'app-aus-map',
  templateUrl: './aus-map.component.html',
  styleUrls: ['./aus-map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AusMapComponent implements OnInit {

  width: number;
  height: number;
  svg: any;
  projection: any;
  path: any;
  url: string;

  constructor() { }

  ngOnInit() {
    this.initChart();
    this.drawMap();
    this.addEvents();
  }
  private initChart() {
    this.width = 960;
    this.height = 500;
    this.svg = d3.select("svg").attr("width", this.width).attr("height", this.height);;

    // this.projection = d3.geoMercator()
    this.projection = d3.geoConicConformal()
      .rotate([-132, 0])
      .center([0, -27])
      .parallels([-18, -36])
      .scale(Math.min(this.height * 1.2, this.width * 0.8))
      .translate([this.width / 2, this.height / 2])
      .precision(0.1);

    this.path = d3.geoPath()
      .projection(this.projection);


    this.url = "../../../assets/australia.json";
  }
  private drawMap() {
    const self = this;
    d3.json(this.url, function (err, australia: any) {
      // self.svg.append("path")
      //   .attr("class", "states")
      //   .datum(topojson.feature(us, us.objects.states))
      //   .attr("d", self.path)
      self.svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(australia, australia.objects.states).features)
        .enter().append("path")
        .attr("d", self.path)
    })
  }
  addEvents() {
    d3.select(self.frameElement).style("height", this.height + "px");
  }
}
