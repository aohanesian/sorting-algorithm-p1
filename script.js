const n = 20;
const array = [];
const container = document.querySelector(`#container`);

const buttons = Array.from(document.querySelectorAll("button"));
const funcBtns = buttons.filter(btn => btn.innerHTML !== 'Generate Array');

function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars();
}
init();

function refreshPage() {
    window.location.reload();
}

function playBubbleSort() {
    let copy = [...array];
    let moves = bubbleSort(copy);
    animate(moves);
}

function animate(moves) {
    if (moves.length === 0) {
        showBars();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type === "swap") {
        [array[i], array[j]] = [array[j], array[i]];
    }

    showBars(move);
    setTimeout(() => animate(moves), 150);
}

function showBars(move) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement(`div`);
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
        }
        container.append(bar);
    }
}

function bubbleSort(array) {
    let moves = [];
    do {
        var swapped = false;
        for (let i = 0; i < array.length; i++) {
            moves.push({ indices: [i - 1, i], type: "comp" });
            if (array[i - 1] > array[i]) {
                swapped = true;
                moves.push({ indices: [i - 1, i], type: "swap" });
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
            }
        }
    } while (swapped);
    return moves;
}

function selectionSort(array) {
    let moves = [];
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            moves.push({ indices: [minIndex, j], type: "comp" });
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            moves.push({ indices: [minIndex, i], type: "swap" });
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }

    return moves;
}

function playSelectionSort() {
    let copy = [...array];
    let moves = selectionSort(copy);
    animate(moves);
}

function insertionSort(array) {
    let moves = [];
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        moves.push({ indices: [i, j], type: "comp" });

        while (j >= 0 && array[j] > key) {
            moves.push({ indices: [j + 1, j], type: "swap" });
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = key;
    }

    return moves;
}

function playInsertionSort() {
    let copy = [...array];
    let moves = insertionSort(copy);
    animate(moves);
}

function quickSort(array, low, high, moves) {
    if (low < high) {
        let pi = partition(array, low, high, moves);

        quickSort(array, low, pi - 1, moves);
        quickSort(array, pi + 1, high, moves);
    }
}

function partition(array, low, high, moves) {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        moves.push({ indices: [j, high], type: "comp" });

        if (array[j] < pivot) {
            i++;
            moves.push({ indices: [i, j], type: "swap" });
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    moves.push({ indices: [i + 1, high], type: "swap" });
    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    return i + 1;
}

function playQuickSort() {
    let copy = [...array];
    let moves = [];
    quickSort(copy, 0, copy.length - 1, moves);
    animate(moves);
}
