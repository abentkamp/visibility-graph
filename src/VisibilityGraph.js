import createGraph from 'ngraph.graph'
import { createGraphFromGeoJson, addSinglePoint } from './createGraphFromGeoJson'
import { edgeIntersect } from './utils'
import { setupStructure } from './setupStructure'
import Point from './Point'

export default class VisibilityGraph {
  constructor () {
      this.graph = null

      this._points = []
      this._clonedPoints = []
      this._edges = []
      this._polygons = []
      this._lastOrigin = null
      this._lastDestination = null
  }

  createGraphFromGeoJson (geojson) {
      setupStructure(this, geojson)
      this.graph = createGraph()
      createGraphFromGeoJson(this, geojson)
  }

  getdNodeIdByLatLon (latLon) {
    for (var i = 0; i < this._points.length; i++) {
      if (this._points[i].x === latLon[0] && this._points[i].y === latLon[1] ) return this._points[i].nodeId
    }
    return null
  }

  loadGraphFromJson (geojson, jsonGraph) {
      setupStructure(geojson, this)
      this.graph = jsonGraph
  }

  saveGraphToJson () {

  }

  shortestPath (origin, destination) {
    if (this._lastOrigin !== null) {
      this.graph.removeNode(this._lastOrigin.nodeId)
      this.graph.removeNode(this._lastDestination.nodeId)
    }

    this._lastOrigin = new Point(origin.geometry.coordinates, -1)
    this._lastDestination = new Point(destination.geometry.coordinates, -1)

    addSinglePoint(this, this._lastOrigin)
    addSinglePoint(this, this._lastDestination)

    var directLine = true;
    for (var i = 0; i < this._edges.length; i++) {
      if (edgeIntersect(this._lastOrigin, this._lastDestination, this._edges[i])) {
        directLine = false;
        break;
      }
    }
    if (directLine) this.graph.addLink(this._lastOrigin.nodeId, this._lastDestination.nodeId);

    return [this._lastOrigin, this._lastDestination]
  }

}