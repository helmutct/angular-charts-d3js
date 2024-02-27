import { Component, ViewEncapsulation, Input, OnChanges, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Neo4jd3Options } from './models/neo4jd3-options.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'zr-neo4jd3',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./neo4jd3.component.scss'],
    templateUrl: './neo4jd3.component.html'
})
export class Neo4jd3Component implements OnChanges {

    @Input() options: Neo4jd3Options;
    @Input() height = '500px';

    selector = '';
    container: any;
    info: any;
    node: any;
    nodes: any;
    relationship: any;
    relationshipOutline: any;
    relationshipOverlay: any;
    relationshipText: any;
    relationships: any;
    simulation: any;
    svg: any;
    svgNodes: any;
    svgRelationships: any;
    svgScale: any;
    svgTranslate: any;
    classes2colors: any = {};
    justLoaded = false;
    numClasses = 0;
    VERSION: String = '0.0.1';
    textnodeBBox: any;

    constructor(private eltRef: ElementRef) {
    }

    ngOnChanges() {
        // your code to update the model
        if (this.options != null) {

            this.fillOptionsDefaults();

            this.container = d3.select(this.eltRef.nativeElement).select('.neo4jd3-chart-network');

            this.container.attr('class', 'neo4jd3-chart-network')
                .html('');

            if (this.options.infoPanel) {
                this.info = this.appendInfoPanel(this.container);
            }

            this.appendGraph(this.container);

            this.simulation = this.initSimulation();

            if (this.options.neo4jData) {
                this.loadNeo4jData();
            } else if (this.options.neo4jDataUrl) {
                this.loadNeo4jDataFromUrl(this.options.neo4jDataUrl);
            } else {
                console.error('Error: both neo4jData and neo4jDataUrl are empty!');
            }
        }
    }

    private fillOptionsDefaults() {
        if (this.options.arrowSize === 0) {
            this.options.arrowSize = 4;
        }
        if (this.options.colors.length === 0) {
            this.options.colors = this.colors();
        }
        if (this.options.icons.size > 0) {
            this.options.showIcons = true;
        } else {
            this.options.icons = this.fontAwesomeIcons();
        }
        if (this.options.minCollision === 0) {
            this.options.minCollision = this.options.nodeRadius * 2;
        }
        if (this.options.nodeRadius === 0) {
            this.options.nodeRadius = 25;
        }
        if (this.options.relationshipColor === '') {
            this.options.relationshipColor = '#a5abb6';
        }
    }

    private appendGraph(container: any);
    private appendGraph(container) {

        this.svg = container.append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', 'neo4jd3-graph')
            .call(d3.zoom().on('zoom',
                () => {
                    let scale = d3.event.transform.k,
                        translate = [d3.event.transform.x, d3.event.transform.y];

                    if (this.svgTranslate) {
                        translate[0] += this.svgTranslate[0];
                        translate[1] += this.svgTranslate[1];
                    }

                    if (this.svgScale) {
                        scale *= this.svgScale;
                    }

                    this.svg.attr('transform', 'translate(' + translate[0] + ', ' + translate[1] + ') scale(' + scale + ')');
                }))
            .on('dblclick.zoom', null)
            .append('g')
            .attr('width', '100%')
            .attr('height', '100%');

        this.svgRelationships = this.svg.append('g')
            .attr('class', 'relationships');

        this.svgNodes = this.svg.append('g')
            .attr('class', 'nodes');

    }

    private appendImageToNode(node: any);
    private appendImageToNode(node) {
        return node.append('image')
            .attr('height',
                d => this.icon(d) ? '24px' : '30px')
            .attr('x',
                d => this.icon(d) ? '5px' : '-15px')
            .attr('xlink:href',
                d => this.image(d))
            .attr('y',
                d => this.icon(d) ? '5px' : '-16px')
            .attr('width',
                d => this.icon(d) ? '24px' : '30px');
    }

    private appendInfoPanel(container: any);
    private appendInfoPanel(container) {
        return container.append('div')
            .attr('class', 'neo4jd3-info');
    }

    private appendInfoElement(cls: any, isNode: any, property: any, value: any);
    private appendInfoElement(cls, isNode, property, value) {
        const elem = this.info.append('a');

        elem.attr('href', '#')
            .attr('class', cls)
            .html('<strong>' + property + '</strong>' + (value ? (': ' + value) : ''));

        if (!value) {
            elem.style('background-color',
                d => this.options.nodeOutlineFillColor
                    ? this.options.nodeOutlineFillColor
                    : (isNode ? this.class2color(property) : this.defaultColor()))
                .style('border-color',
                    d => this.options.nodeOutlineFillColor
                        ? this.class2darkenColor(this.options.nodeOutlineFillColor)
                        : (isNode ? this.class2darkenColor(property) : this.defaultDarkenColor()))
                .style('color',
                    d => this.options.nodeOutlineFillColor ? this.class2darkenColor(this.options.nodeOutlineFillColor) : '#fff');
        }
    }

    private appendInfoElementClass(cls: any, node: any);
    private appendInfoElementClass(cls, node) {
        this.appendInfoElement(cls, true, node, null);
    }

    private appendInfoElementProperty(cls: any, property: any, value: any);
    private appendInfoElementProperty(cls, property, value) {
        this.appendInfoElement(cls, false, property, value);
    }

    private appendInfoElementRelationship(cls: any, relationship: any);
    private appendInfoElementRelationship(cls, relationship) {
        this.appendInfoElement(cls, false, relationship, null);
    }

    private appendNode() {
        const reference = this;
        return this.node.enter()
            .append('g')
            .attr('class',
                d => {
                    let highlight,
                        i,
                        classes = 'node',
                        label = d.labels[0];

                    if (this.icon(d)) {
                        classes += ' node-icon';
                    }

                    if (this.image(d)) {
                        classes += ' node-image';
                    }

                    if (this.options.highlight) {
                        for (i = 0; i < this.options.highlight.length; i++) {
                            highlight = this.options.highlight[i];

                            if (d.labels[0] === highlight.class &&
                                d.properties[highlight.property] === highlight.value) {
                                classes += ' node-highlighted';
                                break;
                            }
                        }
                    }

                    return classes;
                })
            .on('click',
                d => {
                    d.fx = d.fy = null;

                    if (typeof this.options.onNodeClick === 'function') {
                        this.options.onNodeClick(d);
                    }
                })
            .on('dblclick',
                d => {
                    d.fx = d3.event.x;
                    d.fy = d3.event.y;

                    if (typeof this.options.onNodeDoubleClick === 'function') {
                        this.options.onNodeDoubleClick(d);
                    }
                })
            .on('mouseenter',
                d => {
                    if (this.info) {
                        this.updateInfo(d);
                    }

                    if (typeof this.options.onNodeMouseEnter === 'function') {
                        this.options.onNodeMouseEnter(d);
                    }
                })
            .on('mouseleave',
                d => {
                    if (this.info) {
                        this.clearInfo();
                    }

                    if (typeof this.options.onNodeMouseLeave === 'function') {
                        this.options.onNodeMouseLeave(d);
                    }
                })
            .call(d3.drag()
                .on('start',
                    d => {
                        if (!d3.event.active) {
                            this.simulation.alphaTarget(0.3).restart();
                        }

                        d.fx = d.x;
                        d.fy = d.y;

                        if (typeof this.options.onNodeDragStart === 'function') {
                            this.options.onNodeDragStart(d);
                        }
                    })
                .on('drag',
                    d => {
                        d.fx = d3.event.x;
                        d.fy = d3.event.y;
                    })
                .on('end',
                    d => {
                        if (!d3.event.active) {
                            this.simulation.alphaTarget(0);
                        }

                        if (typeof this.options.onNodeDragEnd === 'function') {
                            this.options.onNodeDragEnd(d);
                        }
                    }));
    }

    private appendNodeToGraph() {
        const n = this.appendNode();

        this.appendRingToNode(n);
        this.appendOutlineToNode(n);

        if (this.options.icons) {
            this.appendTextToNode(n);
        }

        if (this.options.images) {
            this.appendImageToNode(n);
        }

        return n;
    }

    private appendOutlineToNode(node: any);
    private appendOutlineToNode(node) {
        return node.append('circle')
            .attr('class', 'outline')
            .attr('r', this.options.nodeRadius)
            .style('fill',
                d => this.options.nodeOutlineFillColor ? this.options.nodeOutlineFillColor : this.class2color(d.labels[0]))
            .style('stroke',
                d => this.options.nodeOutlineFillColor
                    ? this.class2darkenColor(this.options.nodeOutlineFillColor)
                    : this.class2darkenColor(d.labels[0]))
            .append('title').text(d => String(d));
    }

    private appendRingToNode(node: any);
    private appendRingToNode(node) {
        return node.append('circle')
            .attr('class', 'ring')
            .attr('r', this.options.nodeRadius * 1.16)
            .append('title').text(d => String(d));
    }

    private appendTextToNode(node: any);
    private appendTextToNode(node) {
        return node.append('text')
            .attr('class',
                d => 'text' + (this.icon(d) ? ' icon' : ''))
            .attr('fill', '#ffffff')
            .attr('font-size',
                d => this.icon(d) ? (this.options.nodeRadius + 'px') : '10px')
            .attr('pointer-events', 'none')
            .attr('text-anchor', 'middle')
            .attr('y',
                d => this.icon(d) ? (Math.round(this.options.nodeRadius * 0.32) + 'px') : '4px')
            .html(d => {
                const _icon = this.icon(d);
                return _icon ? '&#x' + _icon : d.id;
            });
    }

    public appendRandomDataToNode(d: any, maxNodesToGenerate: any);
    public appendRandomDataToNode(d, maxNodesToGenerate) {
        const data = this.randomD3Data(d, maxNodesToGenerate);
        this.updateWithNeo4jData(data);
    }

    private appendRelationship() {
        return this.relationship.enter()
            .append('g')
            .attr('class', 'relationship')
            .on('dblclick',
                d => {
                    if (typeof this.options.onRelationshipDoubleClick === 'function') {
                        this.options.onRelationshipDoubleClick(d);
                    }
                })
            .on('mouseenter',
                d => {
                    if (this.info) {
                        this.updateInfo(d);
                    }
                });
    }

    private appendOutlineToRelationship(r: any);
    private appendOutlineToRelationship(r) {
        return r.append('path')
            .attr('class', 'outline')
            .attr('fill', '#a5abb6')
            .attr('stroke', 'none');
    }

    private appendOverlayToRelationship(r: any);
    private appendOverlayToRelationship(r) {
        return r.append('path')
            .attr('class', 'overlay');
    }

    private appendTextToRelationship(r: any);
    private appendTextToRelationship(r) {
        return r.append('text')
            .attr('class', 'text')
            .attr('fill', '#000000')
            .attr('font-size', '8px')
            .attr('pointer-events', 'none')
            .attr('text-anchor', 'middle')
            .text(d => d.type);
    }

    private appendRelationshipToGraph() {
        const relationship = this.appendRelationship(),
            text = this.appendTextToRelationship(relationship),
            outline = this.appendOutlineToRelationship(relationship),
            overlay = this.appendOverlayToRelationship(relationship);

        return {
            outline: outline,
            overlay: overlay,
            relationship: relationship,
            text: text
        };
    }

    private class2color(cls: any);
    private class2color(cls) {
        let color = this.classes2colors[cls];

        if (!color) {
            //            color = options.colors[Math.min(numClasses, options.colors.length - 1)];
            color = this.options.colors[this.numClasses % this.options.colors.length];
            this.classes2colors[cls] = color;
            this.numClasses++;
        }

        return color;
    }

    private class2darkenColor(cls: any);
    private class2darkenColor(cls) {
        return d3.rgb(this.class2color(cls)).darker(1);
    }

    private clearInfo() {
        this.info.html('');
    }

    private color() {
        return this.options.colors[this.options.colors.length * Math.random() << 0];
    }

    private colors() {
        // d3.schemeCategory10,
        // d3.schemeCategory20,
        return [
            '#68bdf6', // light blue
            '#6dce9e', // green #1
            '#ced2d9', // light gray
            '#ffc766', // light orange
            '#a5abb6', // dark gray
            '#405f9e', // navy blue
            '#f2baf6', // purple
            '#ff928c', // light red
            '#fcea7e', // light yellow
            '#78cecb', // green #2,
            '#faafc2', // light pink
            '#ffab1a', // dark orange
            '#b88cbb', // dark purple
            '#e84646', // dark red
            '#fa5f86', // dark pink
            '#fcda19', // dark yellow
            '#797b80', // black
            '#c9d96f', // pistacchio
            '#47991f', // green #3
            '#70edee', // turquoise
            '#ff75ea' // pink
        ];
    }

    private contains(array: any, id: any);
    private contains(array, id) {
        const filter = array.filter(elem => elem.id === id);

        return filter.length > 0;
    }

    private defaultColor() {
        return this.options.relationshipColor;
    }

    private defaultDarkenColor() {
        return d3.rgb(this.options.colors[this.options.colors.length - 1]).darker(1);
    }

    private extend(obj1: any, obj2: any);
    private extend(obj1, obj2) {
        const obj = {};

        this.merge(obj, obj1);
        this.merge(obj, obj2);

        return obj;
    }

    private fontAwesomeIcons() {

        const map = new Map<string, string>();

        // get font awesome codes at:
        // https://fontawesome.com/icons

        map.set('user-md,doctor', 'f0f0');
        map.set('map-marker-alt', 'f3c5');
        map.set('vial,test', 'f492');
        map.set('gavel,lawyer', 'f0e3');
        map.set('user', 'f007');
        map.set('medkit', 'f0fa');
        map.set('pills', 'f484');
        map.set('vials,lab', 'f493');

        map.set('prescription-bottle-alt', 'f486');
        map.set('capsules', 'f46b');

        return map;
    }

    private icon(d: any);
    private icon(d) {
        let code;
        let keyFontAwesome;

        if (this.options.showIcons && this.options.icons.size > 0) {
            keyFontAwesome = this.options.icons.get(d.labels[0]);
            const allIcons = this.fontAwesomeIcons();
            code = allIcons.get(keyFontAwesome);
        }

        return code;
    }

    private image(d: any);
    private image(d) {
        let imagesForLabel;

        if (this.options.images) {
            if (d.fraud) {
                imagesForLabel = this.options.images.get(d.labels[0]);
            }
        }

        return imagesForLabel;
    }

    private initSimulation() {
        const simulation = d3.forceSimulation()
            //                           .velocityDecay(0.8)
            //                           .force('x', d3.force().strength(0.002))
            //                           .force('y', d3.force().strength(0.002))
            .force('collide',
                d3.forceCollide().radius(d => this.options.minCollision).iterations(2))
            .force('charge', d3.forceManyBody())
            .force('link',
                d3.forceLink().id((d: any) => d.id))
            .force('center',
                d3.forceCenter(this.svg.node().parentElement.parentElement.clientWidth / 2,
                    this.svg.node().parentElement.parentElement.clientHeight / 2))
            .on('tick',
                () => {
                    this.tick();
                })
            .on('end',
                () => {
                    if (this.options.zoomFit && !this.justLoaded) {
                        this.justLoaded = true;
                        this.zoomFit(2);
                    }
                });

        return simulation;
    }

    private loadNeo4jData() {
        this.nodes = [];
        this.relationships = [];

        this.updateWithNeo4jData(this.options.neo4jData);
    }

    private loadNeo4jDataFromUrl(neo4jDataUrl): Promise<any> {

        this.nodes = [];
        this.relationships = [];

        return d3.json(neo4jDataUrl).then(data => {
            if (data != null) {
                this.updateWithNeo4jData(data);
            }
        });
    }

    private merge(target: any, source: any);
    private merge(target, source) {
        Object.keys(source).forEach(property => {
            target[property] = source[property];
        });
    }

    public neo4jDataToD3Data(data: any);
    public neo4jDataToD3Data(data) {
        const graph = {
            nodes: [],
            relationships: []
        };

        data.results.forEach(result => {
            result.data.forEach(data => {
                data.graph.nodes.forEach(node => {
                    if (!this.contains(graph.nodes, node.id)) {
                        graph.nodes.push(node);
                    }
                });

                data.graph.relationships.forEach(relationship => {
                    relationship.source = relationship.startNode;
                    relationship.target = relationship.endNode;
                    graph.relationships.push(relationship);
                });

                data.graph.relationships.sort((a, b) => {
                    if (a.source > b.source) {
                        return 1;
                    } else if (a.source < b.source) {
                        return -1;
                    } else {
                        if (a.target > b.target) {
                            return 1;
                        }

                        if (a.target < b.target) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                });

                for (let i = 0; i < data.graph.relationships.length; i++) {
                    if (i !== 0 &&
                        data.graph.relationships[i].source === data.graph.relationships[i - 1].source &&
                        data.graph.relationships[i].target === data.graph.relationships[i - 1].target) {
                        data.graph.relationships[i].linknum = data.graph.relationships[i - 1].linknum + 1;
                    } else {
                        data.graph.relationships[i].linknum = 1;
                    }
                }
            });
        });

        return graph;
    }

    public randomD3Data(d: any, maxNodesToGenerate: any);
    public randomD3Data(d, maxNodesToGenerate) {
        let data = {
            nodes: [],
            relationships: []
        },
            i,
            label,
            node,
            numNodes = (maxNodesToGenerate * Math.random() << 0) + 1,
            relationship,
            s = this.size();

        for (i = 0; i < numNodes; i++) {
            label = this.randomLabel();

            node = {
                id: s.nodes + 1 + i,
                labels: [label],
                properties: {
                    random: label
                },
                x: d.x,
                y: d.y
            };

            data.nodes[data.nodes.length] = node;

            relationship = {
                id: s.relationships + 1 + i,
                type: label.toUpperCase(),
                startNode: d.id,
                endNode: s.nodes + 1 + i,
                properties: {
                    from: Date.now()
                },
                source: d.id,
                target: s.nodes + 1 + i,
                linknum: s.relationships + 1 + i
            };

            data.relationships[data.relationships.length] = relationship;
        }

        return data;
    }

    private randomLabel() {
        const icons = Object.keys(this.options.icons);
        return icons[icons.length * Math.random() << 0];
    }

    private rotate(cx: any, cy: any, x: any, y: any, angle: any);
    private rotate(cx, cy, x, y, angle) {
        const radians = (Math.PI / 180) * angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;

        return { x: nx, y: ny };
    }

    private rotatePoint(c: any, p: any, angle: any);
    private rotatePoint(c, p, angle) {
        return this.rotate(c.x, c.y, p.x, p.y, angle);
    }

    private rotation(source: any, target: any);
    private rotation(source, target) {
        return Math.atan2(target.y - source.y, target.x - source.x) * 180 / Math.PI;
    }

    public size() {
        return {
            nodes: this.nodes.length,
            relationships: this.relationships.length
        };
    }

    /*
        private smoothTransform(elem, translate, scale) {
            var animationMilliseconds = 5000,
                timeoutMilliseconds = 50,
                steps = parseInt(animationMilliseconds / timeoutMilliseconds);

            setTimeout(function() {
                smoothTransformStep(elem, translate, scale, timeoutMilliseconds, 1, steps);
            }, timeoutMilliseconds);
        }

        private smoothTransformStep(elem, translate, scale, timeoutMilliseconds, step, steps) {
            var progress = step / steps;

            elem.attr('transform', 'translate(' + (translate[0] * progress) + ', ' + (translate[1] * progress) + ') scale(' + (scale * progress) + ')');

            if (step < steps) {
                setTimeout(function() {
                    smoothTransformStep(elem, translate, scale, timeoutMilliseconds, step + 1, steps);
                }, timeoutMilliseconds);
            }
        }
    */

    private tick() {
        this.tickNodes();
        this.tickRelationships();
    }

    private tickNodes() {
        if (this.node) {
            this.node.attr('transform',
                d => 'translate(' + d.x + ', ' + d.y + ')');
        }
    }

    private tickRelationships() {
        if (this.relationship) {
            this.relationship.attr('transform',
                d => {
                    const angle = this.rotation(d.source, d.target);
                    return 'translate(' + d.source.x + ', ' + d.source.y + ') rotate(' + angle + ')';
                });

            this.tickRelationshipsTexts();
            this.tickRelationshipsOutlines();
            this.tickRelationshipsOverlays();
        }
    }

    private getOutlineAttribute(d: any): any {

        const center = { x: 0, y: 0 },
            angle = this.rotation(d.source, d.target),
            textBoundingBox = this.textnodeBBox,
            textPadding = 5,
            u = this.unitaryVector(d.source, d.target),
            textMargin = {
                x: (d.target.x - d.source.x - (textBoundingBox.width + textPadding) * u.x) * 0.5,
                y: (d.target.y - d.source.y - (textBoundingBox.width + textPadding) * u.y) * 0.5
            },
            n = this.unitaryNormalVector(d.source, d.target, null),
            rotatedPointA1 = this.rotatePoint(center,
                {
                    x: 0 + (this.options.nodeRadius + 1) * u.x - n.x,
                    y: 0 + (this.options.nodeRadius + 1) * u.y - n.y
                },
                angle),
            rotatedPointB1 = this.rotatePoint(center, { x: textMargin.x - n.x, y: textMargin.y - n.y }, angle),
            rotatedPointC1 = this.rotatePoint(center, { x: textMargin.x, y: textMargin.y }, angle),
            rotatedPointD1 = this.rotatePoint(center,
                { x: 0 + (this.options.nodeRadius + 1) * u.x, y: 0 + (this.options.nodeRadius + 1) * u.y },
                angle),
            rotatedPointA2 = this.rotatePoint(center,
                {
                    x: d.target.x - d.source.x - textMargin.x - n.x,
                    y: d.target.y - d.source.y - textMargin.y - n.y
                },
                angle),
            rotatedPointB2 = this.rotatePoint(center,
                {
                    x: d.target.x -
                        d.source.x -
                        (this.options.nodeRadius + 1) * u.x -
                        n.x -
                        u.x * this.options.arrowSize,
                    y: d.target.y -
                        d.source.y -
                        (this.options.nodeRadius + 1) * u.y -
                        n.y -
                        u.y * this.options.arrowSize
                },
                angle),
            rotatedPointC2 = this.rotatePoint(center,
                {
                    x: d.target.x -
                        d.source.x -
                        (this.options.nodeRadius + 1) * u.x -
                        n.x +
                        (n.x - u.x) * this.options.arrowSize,
                    y: d.target.y -
                        d.source.y -
                        (this.options.nodeRadius + 1) * u.y -
                        n.y +
                        (n.y - u.y) * this.options.arrowSize
                },
                angle),
            rotatedPointD2 = this.rotatePoint(center,
                {
                    x: d.target.x - d.source.x - (this.options.nodeRadius + 1) * u.x,
                    y: d.target.y - d.source.y - (this.options.nodeRadius + 1) * u.y
                },
                angle),
            rotatedPointE2 = this.rotatePoint(center,
                {
                    x: d.target.x -
                        d.source.x -
                        (this.options.nodeRadius + 1) * u.x +
                        (- n.x - u.x) * this.options.arrowSize,
                    y: d.target.y -
                        d.source.y -
                        (this.options.nodeRadius + 1) * u.y +
                        (- n.y - u.y) * this.options.arrowSize
                },
                angle),
            rotatedPointF2 = this.rotatePoint(center,
                {
                    x: d.target.x - d.source.x - (this.options.nodeRadius + 1) * u.x - u.x * this.options.arrowSize,
                    y: d.target.y - d.source.y - (this.options.nodeRadius + 1) * u.y - u.y * this.options.arrowSize
                },
                angle),
            rotatedPointG2 = this.rotatePoint(center,
                { x: d.target.x - d.source.x - textMargin.x, y: d.target.y - d.source.y - textMargin.y },
                angle);

        return 'M ' +
            rotatedPointA1.x +
            ' ' +
            rotatedPointA1.y +
            ' L ' +
            rotatedPointB1.x +
            ' ' +
            rotatedPointB1.y +
            ' L ' +
            rotatedPointC1.x +
            ' ' +
            rotatedPointC1.y +
            ' L ' +
            rotatedPointD1.x +
            ' ' +
            rotatedPointD1.y +
            ' Z M ' +
            rotatedPointA2.x +
            ' ' +
            rotatedPointA2.y +
            ' L ' +
            rotatedPointB2.x +
            ' ' +
            rotatedPointB2.y +
            ' L ' +
            rotatedPointC2.x +
            ' ' +
            rotatedPointC2.y +
            ' L ' +
            rotatedPointD2.x +
            ' ' +
            rotatedPointD2.y +
            ' L ' +
            rotatedPointE2.x +
            ' ' +
            rotatedPointE2.y +
            ' L ' +
            rotatedPointF2.x +
            ' ' +
            rotatedPointF2.y +
            ' L ' +
            rotatedPointG2.x +
            ' ' +
            rotatedPointG2.y +
            ' Z';

    }

    private tickRelationshipsOutlines() {
        const reference = this;
        this.relationship.each(function (relationship) {
            const rel = d3.select(this),
                outline = rel.select('.outline'),
                text = rel.select('.text'),
                textnode: any = text.node(),
                bbox = textnode.getBBox(),
                padding = 3;

            this.textnodeBBox = bbox;

            outline.attr('d', (d) => {
                const center = { x: 0, y: 0 },
                    angle = reference.rotation(d.source, d.target),
                    textBoundingBox = bbox,
                    textPadding = 5,
                    u = reference.unitaryVector(d.source, d.target),
                    textMargin = {
                        x: (d.target.x - d.source.x - (textBoundingBox.width + textPadding) * u.x) * 0.5,
                        y: (d.target.y - d.source.y - (textBoundingBox.width + textPadding) * u.y) * 0.5
                    },
                    n = reference.unitaryNormalVector(d.source, d.target, null),
                    rotatedPointA1 = reference.rotatePoint(center,
                        {
                            x: 0 + (reference.options.nodeRadius + 1) * u.x - n.x,
                            y: 0 + (reference.options.nodeRadius + 1) * u.y - n.y
                        },
                        angle),
                    rotatedPointB1 = reference.rotatePoint(center, { x: textMargin.x - n.x, y: textMargin.y - n.y }, angle),
                    rotatedPointC1 = reference.rotatePoint(center, { x: textMargin.x, y: textMargin.y }, angle),
                    rotatedPointD1 = reference.rotatePoint(center,
                        { x: 0 + (reference.options.nodeRadius + 1) * u.x, y: 0 + (reference.options.nodeRadius + 1) * u.y },
                        angle),
                    rotatedPointA2 = reference.rotatePoint(center,
                        {
                            x: d.target.x - d.source.x - textMargin.x - n.x,
                            y: d.target.y - d.source.y - textMargin.y - n.y
                        },
                        angle),
                    rotatedPointB2 = reference.rotatePoint(center,
                        {
                            x: d.target.x -
                                d.source.x -
                                (reference.options.nodeRadius + 1) * u.x -
                                n.x -
                                u.x * reference.options.arrowSize,
                            y: d.target.y -
                                d.source.y -
                                (reference.options.nodeRadius + 1) * u.y -
                                n.y -
                                u.y * reference.options.arrowSize
                        },
                        angle),
                    rotatedPointC2 = reference.rotatePoint(center,
                        {
                            x: d.target.x -
                                d.source.x -
                                (reference.options.nodeRadius + 1) * u.x -
                                n.x +
                                (n.x - u.x) * reference.options.arrowSize,
                            y: d.target.y -
                                d.source.y -
                                (reference.options.nodeRadius + 1) * u.y -
                                n.y +
                                (n.y - u.y) * reference.options.arrowSize
                        },
                        angle),
                    rotatedPointD2 = reference.rotatePoint(center,
                        {
                            x: d.target.x - d.source.x - (reference.options.nodeRadius + 1) * u.x,
                            y: d.target.y - d.source.y - (reference.options.nodeRadius + 1) * u.y
                        },
                        angle),
                    rotatedPointE2 = reference.rotatePoint(center,
                        {
                            x: d.target.x -
                                d.source.x -
                                (reference.options.nodeRadius + 1) * u.x +
                                (- n.x - u.x) * reference.options.arrowSize,
                            y: d.target.y -
                                d.source.y -
                                (reference.options.nodeRadius + 1) * u.y +
                                (- n.y - u.y) * reference.options.arrowSize
                        },
                        angle),
                    rotatedPointF2 = reference.rotatePoint(center,
                        {
                            x: d.target.x - d.source.x - (reference.options.nodeRadius + 1) * u.x - u.x * reference.options.arrowSize,
                            y: d.target.y - d.source.y - (reference.options.nodeRadius + 1) * u.y - u.y * reference.options.arrowSize
                        },
                        angle),
                    rotatedPointG2 = reference.rotatePoint(center,
                        { x: d.target.x - d.source.x - textMargin.x, y: d.target.y - d.source.y - textMargin.y },
                        angle);

                return 'M ' +
                    rotatedPointA1.x +
                    ' ' +
                    rotatedPointA1.y +
                    ' L ' +
                    rotatedPointB1.x +
                    ' ' +
                    rotatedPointB1.y +
                    ' L ' +
                    rotatedPointC1.x +
                    ' ' +
                    rotatedPointC1.y +
                    ' L ' +
                    rotatedPointD1.x +
                    ' ' +
                    rotatedPointD1.y +
                    ' Z M ' +
                    rotatedPointA2.x +
                    ' ' +
                    rotatedPointA2.y +
                    ' L ' +
                    rotatedPointB2.x +
                    ' ' +
                    rotatedPointB2.y +
                    ' L ' +
                    rotatedPointC2.x +
                    ' ' +
                    rotatedPointC2.y +
                    ' L ' +
                    rotatedPointD2.x +
                    ' ' +
                    rotatedPointD2.y +
                    ' L ' +
                    rotatedPointE2.x +
                    ' ' +
                    rotatedPointE2.y +
                    ' L ' +
                    rotatedPointF2.x +
                    ' ' +
                    rotatedPointF2.y +
                    ' L ' +
                    rotatedPointG2.x +
                    ' ' +
                    rotatedPointG2.y +
                    ' Z';
            });
        });
    }

    private tickRelationshipsOverlays() {
        this.relationshipOverlay.attr('d',
            d => {
                const center = { x: 0, y: 0 },
                    angle = this.rotation(d.source, d.target),
                    n1 = this.unitaryNormalVector(d.source, d.target, null),
                    n = this.unitaryNormalVector(d.source, d.target, 50),
                    rotatedPointA = this.rotatePoint(center, { x: 0 - n.x, y: 0 - n.y }, angle),
                    rotatedPointB = this.rotatePoint(center,
                        { x: d.target.x - d.source.x - n.x, y: d.target.y - d.source.y - n.y },
                        angle),
                    rotatedPointC = this.rotatePoint(center,
                        { x: d.target.x - d.source.x + n.x - n1.x, y: d.target.y - d.source.y + n.y - n1.y },
                        angle),
                    rotatedPointD = this.rotatePoint(center, { x: 0 + n.x - n1.x, y: 0 + n.y - n1.y }, angle);

                return 'M ' +
                    rotatedPointA.x +
                    ' ' +
                    rotatedPointA.y +
                    ' L ' +
                    rotatedPointB.x +
                    ' ' +
                    rotatedPointB.y +
                    ' L ' +
                    rotatedPointC.x +
                    ' ' +
                    rotatedPointC.y +
                    ' L ' +
                    rotatedPointD.x +
                    ' ' +
                    rotatedPointD.y +
                    ' Z';
            });
    }

    private tickRelationshipsTexts() {
        this.relationshipText.attr('transform',
            d => {
                const angle = (this.rotation(d.source, d.target) + 360) % 360,
                    mirror = angle > 90 && angle < 270,
                    center = { x: 0, y: 0 },
                    n = this.unitaryNormalVector(d.source, d.target, null),
                    nWeight = mirror ? 2 : -3,
                    point = {
                        x: (d.target.x - d.source.x) * 0.5 + n.x * nWeight,
                        y: (d.target.y - d.source.y) * 0.5 + n.y * nWeight
                    },
                    rotatedPoint = this.rotatePoint(center, point, angle);

                return 'translate(' + rotatedPoint.x + ', ' + rotatedPoint.y + ') rotate(' + (mirror ? 180 : 0) + ')';
            });
    }

    private toString(d: any);
    private toString(d) {
        let s = d.labels ? d.labels[0] : d.type;

        s += ' (<id>: ' + d.id;

        Object.keys(d.properties).forEach(property => {
            s += ', ' + property + ': ' + JSON.stringify(d.properties[property]);
        });

        s += ')';

        return s;
    }

    private unitaryNormalVector(source: any, target: any, newLength: any);
    private unitaryNormalVector(source, target, newLength) {
        const center = { x: 0, y: 0 },
            vector = this.unitaryVector(source, target, newLength);

        return this.rotatePoint(center, vector, 90);
    }

    private unitaryVector(source: any, target: any, newLength?: number);
    private unitaryVector(source, target, newLength?) {
        const length = Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2)) /
            Math.sqrt(newLength || 1);

        return {
            x: (target.x - source.x) / length,
            y: (target.y - source.y) / length,
        };
    }

    public updateWithD3Data(d3Data: any);
    public updateWithD3Data(d3Data) {
        this.updateNodesAndRelationships(d3Data.nodes, d3Data.relationships);
    }

    public updateWithNeo4jData(neo4jData: any);
    public updateWithNeo4jData(neo4jData) {
        const d3Data = this.neo4jDataToD3Data(neo4jData);
        this.updateWithD3Data(d3Data);
    }

    private updateInfo(d: any);
    private updateInfo(d) {
        this.clearInfo();

        if (d.labels) {
            this.appendInfoElementClass('class', d.labels[0]);
        } else {
            this.appendInfoElementRelationship('class', d.type);
        }

        this.appendInfoElementProperty('property', '&lt;id&gt;', d.id);

        Object.keys(d.properties).forEach(property => {
            this.appendInfoElementProperty('property', property, JSON.stringify(d.properties[property]));
        });
    }

    private updateNodes(n: any);
    private updateNodes(n) {
        Array.prototype.push.apply(this.nodes, n);

        this.node = this.svgNodes.selectAll('.node')
            .data(this.nodes, d => d.id);
        const nodeEnter = this.appendNodeToGraph();
        this.node = nodeEnter.merge(this.node);
    }

    private updateNodesAndRelationships(n: any, r: any);
    private updateNodesAndRelationships(n, r) {
        this.updateRelationships(r);
        this.updateNodes(n);

        this.simulation.nodes(this.nodes);
        this.simulation.force('link').links(this.relationships);
    }

    private updateRelationships(r: any);
    private updateRelationships(r) {
        Array.prototype.push.apply(this.relationships, r);

        this.relationship = this.svgRelationships.selectAll('.relationship')
            .data(this.relationships, d => d.id);

        const relationshipEnter = this.appendRelationshipToGraph();

        this.relationship = relationshipEnter.relationship.merge(this.relationship);

        this.relationshipOutline = this.svg.selectAll('.relationship .outline');
        this.relationshipOutline = relationshipEnter.outline.merge(this.relationshipOutline);

        this.relationshipOverlay = this.svg.selectAll('.relationship .overlay');
        this.relationshipOverlay = relationshipEnter.overlay.merge(this.relationshipOverlay);

        this.relationshipText = this.svg.selectAll('.relationship .text');
        this.relationshipText = relationshipEnter.text.merge(this.relationshipText);
    }

    public version() {
        return this.VERSION;
    }

    private zoomFit(transitionDuration: any);
    private zoomFit(transitionDuration) {
        const bounds = this.svg.node().getBBox(),
            parent = this.svg.node().parentElement.parentElement,
            fullWidth = parent.clientWidth,
            fullHeight = parent.clientHeight,
            width = bounds.width,
            height = bounds.height,
            midX = bounds.x + width / 2,
            midY = bounds.y + height / 2;

        if (width === 0 || height === 0) {
            return; // nothing to fit
        }

        this.svgScale = 0.85 / Math.max(width / fullWidth, height / fullHeight);
        this.svgTranslate = [fullWidth / 2 - this.svgScale * midX, fullHeight / 2 - this.svgScale * midY];

        this.svg.attr('transform', 'translate(' + this.svgTranslate[0] + ', ' + this.svgTranslate[1] + ') scale(' + this.svgScale + ')');
        //        smoothTransform(svgTranslate, svgScale);
    }
}
