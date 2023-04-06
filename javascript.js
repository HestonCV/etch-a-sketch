let columns = document.querySelectorAll(".column");
const body = document.querySelector("body");
body.style.height = "100vh";
body.style.margin = 0;
const container = document.createElement("div");
container.classList.add("container");
addStyle(container);

body.appendChild(container);

function addStyle(element)
{
    if(element.classList.contains("container"))
    {
        element.style.display = "flex";
        element.style.flexDirection = "column";
        element.style.height = "100%";
        element.style.flex = 9;
    }
    else if(element.classList.contains("row"))
    {
        element.style.display = "flex";
        element.style.flex = 1;
    }
    else
    {
        element.style.display = "flex";
        element.style.flex = "1";
        element.style.backgroundColor = "white";
        element.style.border = "0px solid black";
    }
}

function createEventListeners(colorMode)
{
    columns = document.querySelectorAll(".column");
    
}

function createGrid(gridLength, colorMode)
{
    //keep gidlength less than 100 to prevent lag
    gridLength = (gridLength > 100) ? 100 : gridLength;

    for(let i = 0; i < gridLength; i++)
    {
        //create row add it to container
        const row = document.createElement("div");
        row.classList.add("row");
        addStyle(row);
        container.appendChild(row);

        //create and add each column cell to the row
        for(let j = 0; j < gridLength; j++)
        {
            const column = document.createElement("div");
            column.classList.add("column");
            addStyle(column);
            row.appendChild(column);
        }
    }
    columns = document.querySelectorAll(".column");
    columns.forEach(column => {
        column.addEventListener("mouseover", function (e)
        {
            e.target.style.backgroundColor = `${colorMode}`;
        });
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

let colorMode = "red";
createGrid(100, "black");
resizeSquare();

window.addEventListener("resize", resizeSquare);

resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", function (){
    columns.forEach(column => {
        column.style.backgroundColor = "white";
    });
});

changeGridButton = document.querySelector(".grid-button");
changeGridButton.addEventListener("click", function () {
    gridLength = parseInt(prompt("Enter the desired grid length."));
    colorMode = prompt("Enter the desired pen color.");
    destroyElements();
    createGrid(gridLength, `${colorMode}`);
});

