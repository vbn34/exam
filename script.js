const questionsPool = [
    {
        question: "Which model are you?",
        options: ["Gpt 5.2", "Gpt 4.1", "Gpt 4 mini", "Gemini"]
    },
    {
        question: "Which approach is used by Merge Sort?",
        options: ["Greedy approach", "Dynamic programming", "Divide-and-conquer", "Backtracking"],
        correct: 2
    },
    {
        question: "What is the best-case time complexity of Merge Sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correct: 1
    },
    {
        question: "What is the space complexity of Merge Sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2
    },
    {
        question: "Which algorithm is used to find the shortest path from a source node to all other nodes in a weighted graph?",
        options: ["Prim’s algorithm", "Dijkstra’s algorithm", "Bellman-Ford algorithm", "Kruskal’s algorithm"],
        correct: 1
    },
    {
        question: "What is the maximum number of swaps in Selection Sort for an array of size n?",
        options: ["n - 1", "n", "n log n", "n²"],
        correct: 0
    },
    {
        question: "Which data structure is used for performing recursion?",
        options: ["Queue", "Linked List", "Stack", "Heap"],
        correct: 2
    },
    {
        question: "The Floyd-Warshall algorithm uses which design technique?",
        options: ["Greedy algorithm", "Divide and Conquer", "Dynamic Programming", "Backtracking"],
        correct: 2
    },
    {
        question: "What is the time complexity of the Floyd-Warshall algorithm?",
        options: ["O(n)", "O(n²)", "O(n³)", "O(2ⁿ)"],
        correct: 2
    },
    {
        question: "Which of the following is NOT a property of a good algorithm?",
        options: ["Precision", "Finiteness", "Ambiguity", "Input/Output specifications"],
        correct: 2
    },
    {
        question: "Which notation is used to represent the upper bound of an algorithm's running time?",
        options: ["Big-O", "Omega", "Theta", "Little-o"],
        correct: 0
    },
    {
        question: "What is the Hamiltonian path problem classified as?",
        options: ["P problem", "NP-complete", "Undecidable", "Linear time"],
        correct: 1
    },
    {
        question: "A heap is a:",
        options: ["Linear data structure", "Complete binary tree", "Graph", "Hash table"],
        correct: 1
    },
    {
        question: "Which sorting algorithm is NOT comparison-based?",
        options: ["Quick Sort", "Merge Sort", "Counting Sort", "Heap Sort"],
        correct: 2
    },
    {
        question: "What is the time complexity of Binary Search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        correct: 1
    },
    {
        question: "Which symbol represents a decision in a flowchart?",
        options: ["Rectangle", "Oval", "Diamond", "Parallelogram"],
        correct: 2
    },
    {
        question: "Which of these is a greedy algorithm?",
        options: ["Dijkstra’s Algorithm", "Merge Sort", "Floyd-Warshall", "Fibonacci sequence"],
        correct: 0
    },
    {
        question: "What is the worst-case time complexity of Quick Sort?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        correct: 3
    },
    {
        question: "Which approach uses a 2D array to store lengths of common subsequences in the LCS problem?",
        options: ["Greedy", "Dynamic Programming", "Backtracking", "Divide and Conquer"],
        correct: 1
    },
    {
        question: "What does 'Priori analysis' mean?",
        options: ["Analyzing after execution", "Analyzing before implementation", "Analyzing on specific hardware", "Measuring real-time in seconds"],
        correct: 1
    },
    {
        question: "What is the main purpose of topological sort?",
        options: ["Finding shortest paths", "Sorting nodes in a directed acyclic graph", "Searching for an element", "Balancing a tree"],
        correct: 1
    },
    {
        question: "Which algorithm is best suited for dense graphs to find all-pairs shortest paths?",
        options: ["Dijkstra", "BFS", "Floyd-Warshall", "Kruskal"],
        correct: 2
    },
    {
        question: "Which of the following is true about Merge Sort?",
        options: ["It is an in-place sort", "It is not stable", "It is not an in-place sort", "It has O(n²) complexity"],
        correct: 2
    },
    {
        question: "What is the Pigeonhole principle used for in hashing?",
        options: ["To find the fastest search", "To guarantee at least one collision", "To sort elements", "To balance the tree"],
        correct: 1
    },
    {
        question: "Which notation describes the average case performance?",
        options: ["Theta", "Big-O", "Omega", "None"],
        correct: 0
    },
    {
        question: "In pseudocode, a loop that repeats a block of code a fixed number of times is a:",
        options: ["WHILE loop", "REPEAT...UNTIL loop", "FOR loop", "IF statement"],
        correct: 2
    },
    {
        question: "What is the primary purpose of Big-O notation?",
        options: ["To measure actual execution time", "To describe asymptotic complexity", "To define hardware limits", "To debug code"],
        correct: 1
    },
    {
        question: "Which theorem provides a way to get the time complexity of divide-and-conquer algorithms?",
        options: ["Master Theorem", "Taylor’s Theorem", "Fermat’s Theorem", "Euler’s Theorem"],
        correct: 0
    },
    {
        question: "Which of the following is a stable sorting algorithm?",
        options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
        correct: 2
    },
    {
        question: "What happens when two or more keys result in the same hash value?",
        options: ["Overflow", "Collision", "Exception", "Sorting"],
        correct: 1
    }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let totalQuestions = 30;
let timeLeft = 45 * 60; // 45 minutes for 30 MCQs

function initQuiz() {
    // Shuffle and take 30
    selectedQuestions = [...questionsPool]
        .sort(() => 0.5 - Math.random())
        .slice(0, totalQuestions);
    
    renderNavGrid();
    loadQuestion(0);
    startTimer();
}

function renderNavGrid() {
    const navGrid = document.getElementById('nav-grid');
    navGrid.innerHTML = '';
    selectedQuestions.forEach((_, index) => {
        const box = document.createElement('div');
        box.className = 'nav-box';
        box.textContent = index + 1;
        box.onclick = () => loadQuestion(index);
        navGrid.appendChild(box);
    });
    updateNavUI();
}

function loadQuestion(index) {
    currentQuestionIndex = index;
    const q = selectedQuestions[index];
    
    document.getElementById('page-count').textContent = `(page ${index + 1} of ${totalQuestions})`;
    document.getElementById('q-num-info').textContent = index + 1;
    document.getElementById('question-text').textContent = q.question;
    
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';
    
    const labels = ['a', 'b', 'c', 'd'];
    q.options.forEach((opt, i) => {
        const label = document.createElement('label');
        label.className = 'option-item';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz-option';
        radio.value = i;
        if (userAnswers[index] === i) radio.checked = true;
        
        radio.onchange = () => {
            userAnswers[index] = i;
            updateNavUI();
            document.querySelector('.status').textContent = "Answer saved";
        };
        
        const span = document.createElement('span');
        span.className = 'option-label';
        span.textContent = `${labels[i]}. ${opt}`;
        
        label.appendChild(radio);
        label.appendChild(span);
        optionsList.appendChild(label);
    });

    if (userAnswers[index] !== undefined) {
        document.querySelector('.status').textContent = "Answer saved";
    } else {
        document.querySelector('.status').textContent = "Not yet answered";
    }

    document.getElementById('prev-btn').style.visibility = index === 0 ? 'hidden' : 'visible';
    document.getElementById('next-btn').textContent = index === (totalQuestions - 1) ? 'Finish attempt' : 'Next page';
    
    updateNavUI();
}

function updateNavUI() {
    const boxes = document.querySelectorAll('.nav-box');
    boxes.forEach((box, i) => {
        box.classList.remove('current', 'answered');
        if (i === currentQuestionIndex) box.classList.add('current');
        if (userAnswers[i] !== undefined) box.classList.add('answered');
    });
}

function startTimer() {
    const timerDisplay = document.getElementById('timer');
    const interval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(interval);
            alert("Time is up!");
            return;
        }
        timeLeft--;
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

document.getElementById('prev-btn').onclick = () => {
    if (currentQuestionIndex > 0) loadQuestion(currentQuestionIndex - 1);
};

document.getElementById('next-btn').onclick = () => {
    if (currentQuestionIndex < (totalQuestions - 1)) {
        loadQuestion(currentQuestionIndex + 1);
    } else {
        const score = Object.keys(userAnswers).reduce((acc, key) => {
            if (userAnswers[key] == selectedQuestions[key].correct) return acc + 1;
            return acc;
        }, 0);
        alert(`Quiz Finished! Your score: ${score}/${totalQuestions}`);
    }
};

initQuiz();
