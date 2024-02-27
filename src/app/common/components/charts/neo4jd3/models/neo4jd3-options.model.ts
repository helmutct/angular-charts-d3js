export class Highlight {
  constructor(
    public classNode: String,
    public property: String,
    public value: String
  ) { }
}

export class Neo4jd3Options {

  constructor(
    public arrowSize: number,
    public colors: String[],
    public highlight: Highlight[],
    public icons: Map<string, string>,
    public images: Map<string, string>,
    public infoPanel: Boolean,
    public minCollision: number,
    public neo4jData: any,
    public neo4jDataUrl: String,
    public nodeOutlineFillColor: String,
    public nodeRadius: number,
    public relationshipColor: String,
    public zoomFit: Boolean,
    public onNodeClick: Function,
    public onNodeDoubleClick: Function,
    public onNodeMouseEnter: Function,
    public onNodeMouseLeave: Function,
    public onRelationshipDoubleClick: Function,
    public onNodeDragEnd: Function,
    public onNodeDragStart: Function,
    public showIcons: Boolean
    ) {  }

}
