let columns = document.querySelectorAll(".column");
const body = document.querySelector("body");
const container = document.querySelector(".container")
let drawMode = "hover";
let rainbowMode = false;
let colorMode = "black";
let gridMode = 100;
let colorCycle = 0;
let gridCycle = 0;

function createGrid(gridLength)
{
    //keep gidlength less than 100 to prevent lag
    gridLength = (gridLength > 100) ? 100 : gridLength;

    for(let i = 0; i < gridLength; i++)
    {
        //create row add it to container
        const row = document.createElement("div");
        row.classList.add("row");
        container.appendChild(row);

        //create and add each column cell to the row
        for(let j = 0; j < gridLength; j++)
        {
            const column = document.createElement("div");
            column.classList.add("column");
            row.appendChild(column);
        }
    }
    columns = document.querySelectorAll(".column");
    columns.forEach(column => {
        column.addEventListener("mouseover", function (e)
        {
            
            if(drawMode === "hover")
            {
                if(rainbowMode)
                {
                    cycleColor();
                    const colorDisplay = document.querySelector(".color-display");
                    colorDisplay.style.backgroundColor = colorMode;
                }
                e.target.style.backgroundColor = `${colorMode}`;
            }
            return;
        });
        column.addEventListener("click", function (e)
        {
            if(drawMode === "click")
            {
                if(rainbowMode)
                {
                    cycleColor();
                    const colorDisplay = document.querySelector(".color-display");
                    colorDisplay.style.backgroundColor = colorMode;
                }
                e.target.style.backgroundColor = `${colorMode}`;
            }
            return;
        });
    });
}

function createColorPalette() {
    const colorPalette = document.querySelector(".color-palette");
    colorPalette.innerHTML = "";

    const colors = [
        "black", "white", "deepskyblue", "blue", "red", "#90EE90", "green", "yellow", "pink", "magenta", "brown"
    ];

    colors.forEach(color => {
        const colorElement = document.createElement("div");
        colorElement.classList.add("color-element");
        colorElement.style.backgroundColor = color;
        colorElement.style.width = "20px";
        colorElement.style.height = "20px";
        colorElement.style.borderRadius = "100%";

        colorElement.addEventListener("click", function () {
            colorMode = color;
            const colorDisplay = document.querySelector(".color-display");
            colorDisplay.style.backgroundColor = colorMode;
        });

        colorPalette.appendChild(colorElement);
    });
}

function destroyColorPalette()
{
    const colorElements = document.querySelectorAll(".color-element");
    colorElements.forEach(colorElement => {
        colorElement.remove();
    });
}

function resizeSquare()
{
    const container = document.querySelector(".container");
    container.style.width = window.getComputedStyle(container).getPropertyValue("height");
}

function destroyElements()
{
    rows = document.querySelectorAll(".row");
    rows.forEach(row => {
        row.remove();
    });
}

function cycleColor()
{
    colorCycle++;
    if(rainbowMode && colorCycle === 0 || (rainbowMode && colorCycle === 9) || (rainbowMode && colorCycle === 1))
    {
        colorCycle++;
    }
    colorCycle = (colorCycle > 10) ? 0 : colorCycle;
    switch(colorCycle)
    {
        case 0:
            colorMode = "black";
            break;
        case 1:
            colorMode = "white";
            break;
        case 2:
            colorMode = "deepskyblue";
            break;
        case 3:
            colorMode = "blue";
            break;
        case 4:
            colorMode = "red";
            break;
        case 5:
            colorMode = "#90EE90";
            break;
        case 6:
            colorMode = "green";
            break;
        case 7:
            colorMode = "yellow"
            break;
        case 8:
            colorMode = "pink";
            break;
        case 9:
            colorMode = "magenta";
            break;
        case 10:
            colorMode = "brown";
            break;
    }
}

function cycleGrid()
{
    const sizeDisplay = document.querySelector(".size-display");
    gridCycle++;
    gridCycle = (gridCycle > 3) ? 0 : gridCycle;
    switch(gridCycle)
    {
        case 0:
            sizeDisplay.style.height = "10px";
            sizeDisplay.style.width = "10px";
            gridMode = 100;
            break;
        case 1:
            sizeDisplay.style.height = "20px";
            sizeDisplay.style.width = "20px";
            gridMode = 50;
            break;
        case 2:
            sizeDisplay.style.height = "30px";
            sizeDisplay.style.width = "30px";
            gridMode = 25;
            break;
        case 3:
            sizeDisplay.style.height = "40px";
            sizeDisplay.style.width = "40px";
            gridMode = 10;
            break;
    }
}

createGrid(gridMode);
resizeSquare();

window.addEventListener("resize", resizeSquare);

resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", function (){
    columns.forEach(column => {
        column.style.backgroundColor = "white";
    });
});

const colorButton = document.querySelector(".color-button");
colorButton.addEventListener("click", function () {
    cycleColor();
    const colorDisplay = document.querySelector(".color-display");
    colorDisplay.style.backgroundColor = colorMode;
});

const gridButton = document.querySelector(".grid-button");
gridButton.addEventListener("click", function () {
    cycleGrid();
    destroyElements();
    createGrid(gridMode);
});

const hoverButton = document.querySelector(".hover-button");
hoverButton.addEventListener("click", function () {
    hoverButton.textContent = (drawMode === "hover") ? "Click" : "Hover";
    drawMode = (drawMode === "hover") ? "click" : "hover";
});

const displayButton = document.querySelector(".color-display");
displayButton.addEventListener("click", function () {
    const colorElements = document.querySelectorAll(".color-element");
    console.log(colorElements);
    if(colorElements.length > 0)
    {
        destroyColorPalette();
        return;
    }
    createColorPalette();
});

const rainbowButton = document.querySelector(".rainbow-button");
rainbowButton.addEventListener("click", function () {
    const rainbowBackground = document.querySelectorAll(".rb-background");
    const hoverButton = document.querySelector(".hover-button");
    const colorButton = document.querySelector(".color-button");
    rainbowMode = (rainbowMode) ? false : true;
    if(rainbowMode)
    {
        console.log("test");
        hoverButton.style.margin = "0 2px";
        colorButton.style.margin = "0 2px";

        rainbowBackground.forEach(bg => {
            bg.style.padding = "2px";
        });
    }
    else
    {
        hoverButton.style.margin = "0px";
        colorButton.style.margin = "0px";
        rainbowBackground.forEach(bg => {
            bg.style.padding = 0;
        });
    }


});