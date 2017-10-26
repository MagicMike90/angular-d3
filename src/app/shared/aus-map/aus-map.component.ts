import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as topojson from 'topojson';
import * as leaflet from 'leaflet';

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
  g: any;
  projection: any;
  path: any;
  url: string;
  active: any;

  constructor() { }

  ngOnInit() {
    this.initMap();
    this.drawMap();
  }

  private initMap() {
    this.width = 480;
    this.height = 600;
    this.url = "../../../assets/states.min.geojson";
    this.svg = d3.select("svg").attr("width", this.width).attr("height", this.height);
    this.active = d3.select(null);

    this.svg.append("rect")
      .attr("class", "background")
      .attr("width", this.width)
      .attr("height", this.height)
      .on("click", this.reset.bind(this));

    this.g = this.svg.append("g").style("stroke-width", "1.5px");

    // adjust height of frame
    d3.select(self.frameElement).style("height", this.height + "px");
  }

  private drawMap() {
    d3.json(this.url, (err, aus: any) => {
      if (err) {
        return console.error('d3', err);
      }

      this.projection = d3.geoMercator().fitSize([this.width, this.height], aus);

      this.path = d3.geoPath().projection(this.projection);

      this.g.attr("class", "states")
        .selectAll("path")
        .data(aus.features)
        .enter().append("path")
        .attr("d", this.path)
        .on("mouseover", function (d) {
          d3.select("h2").text(d.properties.name);
          // d3.select(this).attr("class", "county hover");
        })
        .on("mouseout", function (d) {
          d3.select("h2").text("");
          // d3.select(this).attr("class", "county");
        })
        .on("click", this.clicked.bind(this));;

      this.g.append("path")
        .datum(aus.features)
        .attr("class", "mesh")
        .attr("d", this.path);
    })
  }
  clicked(d, i, nodes) {
    if (this.active.node() === nodes[i]) return this.reset();
    this.active.classed("active", false);
    this.active = d3.select(nodes[i]).classed("active", true);
    // this.active = d3.select(nodes[i]).attr("class", "active");

    const bounds = this.path.bounds(d);
    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const scale = .9 / Math.max(dx / this.width, dy / this.height);
    const translate = [this.width / 2 - scale * x, this.height / 2 - scale * y];

    this.g.transition()
      .duration(750)
      .style("stroke-width", 1.5 / scale + "px")
      .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
  }
  reset() {
    this.active.classed("active", false);
    this.active = d3.select(null);

    this.g.transition()
      .duration(750)
      .style("stroke-width", "1.5px")
      .attr("transform", "");
  }

}
