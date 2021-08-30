class Algorithm{
    constructor(length, interval) { //length = the desired size of the array that shall be sorted
        this.algoArray = [] //starting-array
        this.visualArray = []; //array which will be filled with all arrays of the sorting-process (happens in the child-classes)
        this.visualArrayIndex = []; //stores the index of the respective specific element at the respective position of the associated sub-array in this.visualArray
        this.divArray = []; //stores the div-elements with the column-information


        this.interval = interval; //stores the ms for the interval
        this.intervalID = null; //stored the id of the interval



        this.heightParentDiv = document.getElementById("columnWrapper").offsetHeight; //height of the div-parent
        //getting the width of the columns by dividing the width of the parent-div and the (length * 1.5)
        //the 1.5 guarantees that the margin between the columns is exactly the half of their width
        this.columnWidth = Math.floor(document.getElementById("columnWrapper").offsetWidth / (length * 1.5));

        this.fillArray = () => {

            for (let i = 0; i < length; i++){
                let includes = true;
                do {
                    let random = Math.floor(this.heightParentDiv * Math.random()); //getting a random number which is between 0 and the height of the div-parent
                    //modifying the array so that no number is stored twice in the array (this is extremely useful for the visualization-feature of the MergeSort)
                    if(this.algoArray.includes(random)){
                        includes = true;
                    } else {
                        this.algoArray.push(random); //fills the algoArray with the random number
                        includes = false;
                    }

                } while (includes);

            }
        }
        this.fillArray();

        this.getDiv = (array, specificElem) => { //the specificElem is the column that is actually
            let columns = "";
            for (let i = 0; i < array.length; i++) {
                if (i === specificElem){
                    let div = "<div class=\"column\" id=\"specificElem\">&nbsp;</div>";
                    columns = columns + div;
                } else {
                    let div = `<div class=\"column\">&nbsp;</div>`;
                    columns = columns + div;
                }
            }

            return columns;
        }

        this.filLDivArray = () => {
            for (let i = 0; i < this.visualArray.length; i++){
                this.divArray[i] = this.getDiv(this.visualArray[i], this.visualArrayIndex[i]);
            }
            //pushing a last array in the divArray which contains the finished sorted array ith no specific element:
            this.divArray[this.divArray.length] = this.getDiv(this.visualArray[this.visualArray.length-1], this.visualArray.length)
        }

        this.visualizeStep = (i) => {
            let columnWrapper = document.getElementById("columnWrapper");
            let originArray = this.visualArray[i];

            columnWrapper.innerHTML = this.divArray[i];

            let colDivs = document.getElementsByClassName("column");


            for(let j = 0; j < colDivs.length; j++){
                colDivs[j].style.height = `${originArray[j]}px`;
                colDivs[j].style.width = `${this.columnWidth}px`;
            }

        }

        this.showLastDiv = () =>{
            let columnWrapper = document.getElementById("columnWrapper");
            let index = this.divArray.length - 1
            let originArray = this.visualArray[index-1];

            columnWrapper.innerHTML = this.divArray[index];

            let colDivs = document.getElementsByClassName("column");


            for(let i = 0; i < colDivs.length; i++){
                colDivs[i].style.height = `${originArray[i]}px`;
                colDivs[i].style.width = `${this.columnWidth}px`;
            }
        }

        this.visualize = () => {
            let i = 0;
            this.intervalID = setInterval(() => {
                        if (i < this.divArray.length - 1){
                            this.visualizeStep(i);
                            i++;
                        } else {
                            this.showLastDiv();
                            clearInterval(this.intervalID);
                        }
            }, this.interval);

        }




    }

}



class BubbleSort extends Algorithm{
    constructor (length, interval) {
        super(length, interval);

        this.bubbleSort = (array) => {
            let isSorted = false; //termination condition
            let arr = array;
            do {
                let changes = 0;
                for (let i = 0; i < arr.length; i++){
                    this.visualArray.push(array.slice(0));
                    this.visualArrayIndex.push(i);
                    if (arr[i] > arr[i + 1]) {
                        this.visualArray.push(arr.slice(0));
                        this.visualArrayIndex.push(i + 1);
                        let temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                        this.visualArray.push(arr.slice(0));
                        this.visualArrayIndex.push(i);
                        changes++;
                    }
                }

                if (changes > 0){
                    isSorted = false;
                } else {
                    isSorted = true;
                }

            } while (isSorted === false);

        }

    }
}


class MergeSort extends Algorithm{
    constructor(length, interval) {
        super(length, interval);

        /*
        This class contains a functioning merge-sort algorithm.
        However, a possibility has to be established which saves the intermediate steps as arrays for the visualization...
         */

        this.merge = (leftArray, rightArray) => {
            const sortedArray = [];
            while (leftArray.length > 0 && rightArray.length > 0) {
                if (leftArray[0] < rightArray[0]) {
                    sortedArray.push(leftArray[0]);
                    leftArray.shift();

                } else {
                    sortedArray.push(rightArray[0]);
                    rightArray.shift();

                }
            }

            let arr = sortedArray.concat(leftArray).concat(rightArray);
            return arr;
        }

        this.mergeSort = (startArray) => {
            const length = startArray.length;
            if (length === 1) {
                return startArray;
            }

            const mid = Math.floor(length / 2);
            const leftArray = startArray.slice(0, mid);
            const rightArray = startArray.slice(mid, length);


            return this.merge(this.mergeSort(leftArray), this.mergeSort(rightArray))
        }

        this.algoArray = this.mergeSort(this.algoArray);

    }

}

function refresh(){
    location.reload();
}

function mergeSort(){

    /*
    Does not run properly:
    //clearing all potentially existent intervals:
    clearInterval(this.intervalID);
    */


    //accessing the array-size:
    const inputArraySize = document.getElementById("arraySize");
    const arraySize = inputArraySize.value;

    //accessing the ms-value for the interval
    const inputInterval = document.getElementById("interval");
    const interval = parseInt(inputInterval.value);

    //starting the Mergesort:
    let merge = new MergeSort(arraySize, interval);
    merge.mergeSort(merge.algoArray);
    merge.filLDivArray();
    merge.visualize();

}

function bubbleSort(){

    /*
    Does not run properly:
    //clearing all potentially existent intervals:
    clearInterval(this.intervalID);
    */


    let button = document.getElementById("bubble");
    button.setAttribute("onclick", "refresh()");
    button.textContent="Refresh";

    //accessing the array-size:
    const inputArraySize = document.getElementById("arraySize");
    const arraySize = inputArraySize.value;

    //accessing the ms-value for the interval
    const inputInterval = document.getElementById("interval");
    const interval = parseInt(inputInterval.value);

    //starting the Bubblesort:
    let bubble = new BubbleSort(arraySize, interval);
    bubble.bubbleSort(bubble.algoArray);
    bubble.filLDivArray();
    bubble.visualize();

}




