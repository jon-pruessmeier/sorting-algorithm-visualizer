/*  class Algorithm{
  constructor(length, array) { //length = the desired size of the array that shall be sorted
        this.algoArray = (typeof array === 'undefined') ? [] : array; //starting-array
        this.visualArray = []; //array which will be filled with all arrays of the sorting-process (happens in the child-classes)


        this.heightParentDiv = document.getElementById("columnWrapper").offsetHeight; //height of the div-parent
        //getting the width of the columns by dividing the width of the parent-div and the (length * 1.5)
        //the 1.5 guarantees that the margin between the columns is exactly the half of their width
        this.columnWidth = document.getElementById("columnWrapper").offsetWidth / (length * 1.5);

        this.fillArray = () => {

            for (let i = 0; i < length; i++){
                let random = Math.floor(this.heightParentDiv * Math.random()); //getting a random number which is between 0 and the height of the div-parent
                this.algoArray.push(random); //fills the algoArray with the random number
            }
        }
        this.fillArray();

        this.sortedArray = this.algoArray; //copying the original array
        this.sortedArray.sort(); //then sorting the original array for comparison purposes in the algorithm-methods of the child-classes

        //getting the width of the columns by dividing the width of the parent-div and the (length * 1.5)
        //the 1.5 guarantees that the margin between the columns is exactly the half of their width
        const columnWidth = document.getElementById("columnWrapper").offsetWidth / (length * 1.5);

        this.getDiv = (array, specificElem) => { //the specificElem is the column that is actually
            let columns = "";
            for (let i = 0; i < array.length; i++) {
                if (array[i] === specificElem){
                    let div = `<div class=\"column\" id=\"specificElem\" height=\"${array[i]}px\" width=\"${this.columnWidth}px\" ></div>`;
                    columns.concat(div);
                } else {
                    let div = `<div class=\"column\" id=\"specificElem\" height=\"${array[i]}px\" width=\"${this.columnWidth}px\" ></div>`;
                    columns.concat(div);
                }
            }
            return columns;
        }
    }

}

export default Algorithm; */