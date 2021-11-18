'use strict';

let canvas = document.getElementById("canv");
let ctx = canvas.getContext("2d");
ctx.fillStyle = '#000000';

class Point{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function Line(ctx, x0, y0, x1, y1) {
    var dy = Math.abs(y1-y0);
    var dx = Math.abs(x1-x0);
    var dmax = Math.max(dx, dy);
    var dmin = Math.min(dx, dy);
    var xdir = 1;
    if (x1<x0) xdir = -1;	
    var ydir = 1;
    if (y1<y0) ydir = -1;
    var eps = 0;
    var s = 1;
    var k=2*dmin;
    if (dy<=dx) {
        var y = y0;
        for (var x=x0; x*xdir<=x1*xdir; x+=xdir) {
            ctx.fillRect(x*s, y*s, 1*s, 1*s);
            eps = eps+k;
            if (eps>dmax) {
                y+=ydir;
                eps = eps - 2*dmax;
            }	
        } 
    } else {
        var x = x0;
        for (var y=y0; y*ydir<=y1*ydir; y+=ydir) {
            ctx.fillRect(x*s, y*s, 1*s, 1*s);
            eps = eps+k;
            if (eps>dmax) {
                x+=xdir;
                eps = eps - 2*dmax;
            }	
        } 
    }		
}




let points = [];
let edges = [];
let min_y;
let max_y;
let peresech_points = {};

function min_max_y(pnts){
    var min = Infinity;
    var max = 0;
    for(var i = 0; i < pnts.length; ++i){
        if(pnts[i].y > max){
            max = pnts[i].y;
        }
    }
    for(var i = 0; i < pnts.length; ++i){
        if(pnts[i].y < min){
            min = pnts[i].y;
        }
    }
    return [min, max];
}

function make_edges(pnts, edgs){
    for(var i = 0; i < pnts.length-1; ++i){
        edgs.push([pnts[i], pnts[i+1]]);
    }
    edgs.push([pnts[pnts.length-1], pnts[0]]);
    return;
}

function lines(pnts, edgs){
    for(var i = 0; i < pnts.length-1; ++i){
        if(pnts[i].y == pnts[i+1].y){
            delete edgs[i];
        }
    }
}

//var dict = {};

// function peresech(edgs, peres_dict, y){
//     for(var i = 0; i < edgs.length-1; ++i){
//         if((edgs[i].y <= y) && (y <= edgs[i+1].y)){
//             var k = (edgs[i+1].y - edgs[i].y)/(edgs[i+1].x - edgs[i].x);
//             var x = y/k;
//             if(typeof peres_dict[y] == "undefined"){
//                 peres_dict[y] = [];
//             }
//             peres_dict[y].push(x);
//         }
//     }
// }


canvas.addEventListener("click", function(event){
    points.push(new Point(event.offsetX, event.offsetY));
    console.log(event.offsetX, event.offsetY);
    ctx.fillRect(event.offsetX, event.offsetY, 2, 2);
})

function draw(pnts){
    for(var i = 0; i < pnts.length-1; ++i){
        Line(ctx, pnts[i].x, pnts[i].y, pnts[i+1].x, pnts[i+1].y);
    }
    Line(ctx, pnts[pnts.length-1].x, pnts[pnts.length-1].y, pnts[0].x, pnts[0].y);
}


canvas.addEventListener("dblclick", function(event){
    draw(points)
    make_edges(points, edges);
    var temp = min_max_y(points);
    min_y = temp[0];
    max_y = temp[1];
    lines(points, edges);
    console.log(edges);
    for(var y = min_y; y <= max_y; ++y){

        for(var j = 0; j < edges.length-1; ++j){
            if((edges[j][0].y <= y) && (y <= edges[j][1].y)){
                var k = (edges[j][1].y - edges[j][0].y)/(edges[j][1].x - edges[j][0].x);
                var x = y/k;
                if(typeof peresech_points[y] == "undefined"){
                    peresech_points[y] = [];
                }
                peresech_points[y].push(x);
            }
        }
        
        
        //peresech(edges, peresech_points, i);
    }
    // for(var j = 0; j < edges.length; ++j){
    //     if(Math.min(edges[j][0].y, edges[j][1].y) == i){
    //         var temp = Math.min(edges[j][0].y, edges[j][1].y);
    //         var x =  edges[j][1].x;
    //         if(edges[j][0].y == temp){
    //             x = edges[j][0].x;
    //         }
    //         delete peresech_points[y][x];
    //     }
    // }
    console.log(peresech_points)
    for(const [key, value] of peresech_points.entries()){
        for(var j = 0; j < peresech_points[key].length-1; ++j){
            Line(ctx, peresech_points[key][j], key, 
                peresech_points[key][j+1], key)
        }
    }
})