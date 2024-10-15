// Wait until the page has fully loaded to remove the preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500); // Wait 500ms to fully remove preloader
});

// Smooth Scroll for internal links (if needed)
const smoothScroll = (target, duration) => {
    const targetPosition = document.querySelector(target).getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
    });
};

document.querySelector('#startBtn').addEventListener('click', () => {
    smoothScroll('#fitness-levels', 1000);
});

/* ---------------- Workout Tracker Section ---------------- */
// Dummy workouts (this can be pulled from a database in the future)
let workouts = [
    { name: 'Push-ups', completed: false },
    { name: 'Squats', completed: false },
    { name: 'Plank', completed: false }
];

const workoutList = document.getElementById('workout-list');
const markCompleteBtn = document.getElementById('markCompleteBtn');

const displayWorkouts = () => {
    workoutList.innerHTML = ''; // Clear existing workout list
    workouts.forEach((workout, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" id="workout-${index}" ${workout.completed ? 'checked' : ''} />
            <label for="workout-${index}">${workout.name}</label>
        `;
        workoutList.appendChild(listItem);

        // Mark the workout as completed on change
        document.getElementById(`workout-${index}`).addEventListener('change', (e) => {
            workouts[index].completed = e.target.checked;
            updateProgress();
        });
    });
};

markCompleteBtn.addEventListener('click', () => {
    alert('All completed workouts are saved!');
});

// Initial display of workouts
displayWorkouts();

/* ---------------- Progress Tracker with Chart.js ---------------- */
// Assuming Chart.js is included in your project
let ctx = document.getElementById('progressChart').getContext('2d');
let progressChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Completed', 'Remaining'],
        datasets: [{
            label: 'Workout Progress',
            data: [0, workouts.length],
            backgroundColor: ['#2ecc71', '#e74c3c']
        }]
    }
});

const updateProgress = () => {
    const completed = workouts.filter(workout => workout.completed).length;
    const remaining = workouts.length - completed;

    progressChart.data.datasets[0].data = [completed, remaining];
    progressChart.update();
};

// Call once on page load to set initial chart values
updateProgress();

/* ---------------- User Authentication Section ---------------- */
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const userProfile = document.getElementById('profile');
const fitnessGoalElement = document.getElementById('fitnessGoal');
let currentUser = null; // This would normally be managed by your authentication service (e.g., Firebase)

// Dummy user database (replace with real authentication system)
let users = [
    { username: 'testuser', password: 'password123', fitnessGoal: 'Lose 5kg' }
];

// Register a new user
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const fitnessGoal = document.getElementById('registerFitnessGoal').value;

    users.push({ username, password, fitnessGoal });
    alert('User registered! Now log in.');
    registerForm.reset();
});

// Log in an existing user
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        loginForm.reset();
        displayUserProfile();
    } else {
        alert('Invalid username or password');
    }
});

const displayUserProfile = () => {
    userProfile.classList.add('show');
    fitnessGoalElement.textContent = currentUser.fitnessGoal;
};

/* ---------------- Motivation Section (Random Quotes) ---------------- */
const quotes = [
    "Don't stop until you're proud.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Believe you can, and you're halfway there."
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuoteBtn');

newQuoteBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[randomIndex];
});

// Initial quote display
quoteDisplay.textContent = quotes[0];
