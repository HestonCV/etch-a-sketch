
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

function createGrid(gridLength)
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
}


function resizeSquare()
{
    const container = document.querySelector(".container");
    container.style.width = window.getComputedStyle(container).getPropertyValue("height");
}

//let gridLength = prompt("Enter a grid length");

createGrid(100);
resizeSquare();

window.addEventListener("resize", resizeSquare);

const columns = document.querySelectorAll(".column");
columns.forEach(column => {
    column.addEventListener("mouseover", function (e)
    {
        e.target.style.backgroundColor = "black";
    });
});

resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", function (){
    const columns = document.querySelectorAll(".column");
    columns.forEach(column => {
        column.style.backgroundColor = "white";
    })
});

