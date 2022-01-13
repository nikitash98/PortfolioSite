var img = new Image();
img.crossOrigin = 'anonymous';
img.src = 'rhino.png';
$(document).ready(function () {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');


    ctx.imageSmoothingEnabled = false;

    var scale = 10;
    const width = Math.floor(canvas.clientWidth / scale);
    const height = Math.floor(canvas.clientHeight / scale);

    var canvasOffset = $("#myCanvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var mouseX = 0;
    var mouseY = 0;
var randomize = false;
    // If it's resolution does not match change it
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
    }

    var grid = new Array(height);
    for (var i = 0; i < grid.length; ++i) {
        grid[i] = new Array(width).fill([0, 0, 0, 0]);
    }


 
    if(randomize) {
        for (var i = 0; i < grid.length; ++i) {
            for(var j = 0; j < width; j++) {
                grid[i][j] = [255, 0, 0, Math.random()*255]
                
            }
        }
    }

    console.log(grid);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    var gradient = new Array(height);
    for (var i = 0; i < grid.length; ++i) {
        gradient[i] = new Array(width);
        for(var j = 0; j < width; j++) {
            let randrad = Math.random() * 2 * Math.PI;
            gradient[i][j] = [Math.sin(randrad), Math.cos(randrad)];
   
        }
        //gradient[i] = new Array(width).fill([0, 1]);

    }
    

    /**
     * 
img.onload = function() {
    ctx.drawImage(img, 0, 0);
};
     */

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    var original = function () {

        //ctx.drawImage(img, 0, 0);

    };

    function handleMouseMove(e) {
        var rect = canvas.getBoundingClientRect();
        mouseX = parseInt((e.clientX - rect.left) / scale);
        mouseY = parseInt((e.clientY - rect.top) / scale);
        grid[mouseY][mouseX] = [255, 0, 0, 255]
        
        // Put your mousemove stuff here

    }

    function handleMouseClick(e) {
        var rect = canvas.getBoundingClientRect();
        mouseX = parseInt((e.clientX - rect.left) / scale);
        mouseY = parseInt((e.clientY - rect.top) / scale);


        // Put your mousemove stuff here

    }


    const inputs = document.querySelectorAll('[name=color]');
    for (const input of inputs) {
        input.addEventListener("change", function (evt) {
            switch (evt.target.value) {
                case "inverted":
                    return invert();
                case "grayscale":
                    return grayscale();
                default:
                    return original();
            }
        });
    }
    function pixelIndex(x, y) {
        let ind = (Math.floor(width) * Math.floor(y) + Math.floor(x));
        return ind * 4;
    }
    function getPixel(x, y, data) {
        let ind = pixelIndex(x, y)
        return [data[ind], data[ind + 1], data[ind + 2], data[ind + 3]]
    }

    function setPixel(x, y, data, entry) {
        let ind = pixelIndex(x, y)
        data[ind] = entry[0]
        data[ind + 1] = entry[1]
        data[ind + 2] = entry[2]
        data[ind + 3] = entry[3]
    }

    function draw() {
        ctx.imageSmoothingEnabled = false;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        //const ctxdata = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //const ctxdat = ctxdata.data;
        j = (Math.floor(width) * Math.floor(mouseY) + mouseX);
        /** 
        for (var i = 0; i < data.length; i += 4) {
            
            data[i]     = 2;     
            data[i + 1] = 2;
            data[i + 2] = 255; 
            data[i+3] = 255;
        }
        */
        for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++) {
                let pixcolor = [255, 0, 0, 255];
                setPixel(i, j, data, grid[j][i]);
            }

        }
        /**
         * 
        for(var i = 0; i < data.length/4; i++) {
            if(i%2) {
                data[(i*4)] = 2;
                data[(i*4)+1] =2;
                data[(i*4)+2] = 255;
                data[(i*4)+3] = 255;
        
            }
        }
        
        for(var i = 0; i < j; i++) {
                data[(i*4)] = 255;
                data[(i*4)+1] =2;
                data[(i*4)+2] = 255;
                data[(i*4)+3] = 255;
        
            
        }
             */

        const img = ctx.createImageData(1, 1)
        const datatwo = img.data;
        for (var i = 0; i < datatwo.length / 4; i++) {
            datatwo[(i * 4)] = 200;
            datatwo[(i * 4) + 1] = 2;
            datatwo[(i * 4) + 2] = 2;
            datatwo[(i * 4) + 3] = 255;
        }



        ctx.putImageData(imageData, 0, 0);
        //ctx.putImageData(img, mouseX, mouseY)


    }

    function setGrid(x, y, entrygrid, entry) {
        entrygrid[x][y] = [entry[0], entry[1], entry[2],entry[3]];
        //entrygrid[x][y] = [51, 53,52,100]
    }
    function addGrid(x, y, entrygrid, entry) {
        entrygrid[x][y] = [entrygrid[x][y][0] + entry[0], entrygrid[x][y][1] + entry[1], entrygrid[x][y][2] + entry[2], Math.min(entrygrid[x][y][3] + entry[3], 255)]
    }
    function weakenGrid() {
        //var spillarray = [[.01, .10, .01], [.10, .20, .10], [.01, .10, .01]]
        var spillarray = [[0, .05, 0], [.05, .9, .05], [0, .05, 0]]
        
        var newgrid = new Array(height);

        for (var i = 0; i < newgrid.length; ++i) {
            newgrid[i] = new Array(width).fill([0, 0, 0, 0]);
        }
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[0].length; j++) {
                /** 
                if (grid[i][j][1] >= 0 ){
                    grid[i][j][3] *= 0.8;
                }
                */
               /*
               if(gradient[i][j][0] > 0) {
                    spillarray[0][1] = gradient[i][j][0];
               } 
               else {
                    spillarray[2][1] = Math.abs(gradient[i][j][0]);
               }
               */
                /*
                for(var p = 0; p < 3; p++) {
                    for(var q = 0; q < 3; q++) {
                        let dist = Math.sqrt(Math.pow((p-1) - gradient[i][j][0], 2) + Math.pow((q-1) - gradient[i][j][1],2))
                        let amt = 1-dist;
                        if(dist < .1) {
                            spillarray[p][q] =  .5;
                        }
                    }
                }
                */

                if (grid[i][j][3] < 0) {
                    setGrid(i, j, newgrid, [0, 0, 0, 0])
                } else if (grid[i][j][3] > 255) {
                    grid[i][j][3] = 255;
                } else
                    if (grid[i][j][3] > 0) {
                        lessgrid = [grid[i][j][0], grid[i][j][1], grid[i][j][2], grid[i][j][3]];
                        //setGrid(i, j, newgrid, lessgrid);
                        var availablespace =new Array(3);
                        for (var z = 0; z < 3; z++) {
                            availablespace[z] = [0, 0, 0];
                        }
                        for (let l = -1; l < 2; l++) {
                            for (let h = -1; h < 2; h++) {
                                /*
                                lessgrid = [grid[i][j][0], grid[i][j][1], grid[i][j][2], grid[i][j][3] * spillarray[h + 1][l + 1]]
                                setGrid(i, j,newgrid,lessgrid)
                                */
                                
                                lessgrid = [grid[i][j][0], grid[i][j][1], grid[i][j][2], grid[i][j][3] * spillarray[h+1][l+1]]
                                if (i + h >= 0 && i + h <= grid.length - 1 && j + l >= 0 && j + l <= grid[0].length - 1) {
                                    availablespace[h+1][l+1] = 255 - grid[i+h][j+l][3]
                                    /*
                                    if(grid[i + h][j+l][3] <= grid[i][j][3]){
                                        addGrid(i + h, j + l, newgrid, lessgrid);

                                    }
                                    */

                                } 


                            }
                        }
                        for (let l = -1; l < 2; l++) {
                            for (let h = -1; h < 2; h++) {
                                if (i + h >= 0 && i + h <= grid.length - 1 && j + l >= 0 && j + l <= grid[0].length - 1) {
                                lessgrid = [grid[i][j][0], grid[i][j][1], grid[i][j][2], 255]
                                addGrid(i + h, j + l, newgrid, lessgrid);
                                }
                            }
                        }
                        
                    }

            }
        }
        grid = newgrid;

    }

    $(".homepage").mousemove(function (e) { handleMouseMove(e); });
    $("#myCanvas").mousedown(function (e) { handleMouseClick(e); });

    const id = setInterval(() => {
        weakenGrid();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        

    }, 50);


});

/**
console.log(canvas)
}
*/