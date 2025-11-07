const equations = [
  "x ∈ (-∞, 4] ∪ [7, +∞)", "x + 2y = 12", "f(x) = x² - 3x + 2", "∫₀¹ x dx = ½",
  "limₓ→∞ (1 + 1/x)^x = e", "a² + b² = c²", "y = mx + b", "Δx · Δy ≥ ℏ/2",
  "Σᵢ xᵢ / n", "d/dx (sin x) = cos x", "tan(θ) = sin(θ)/cos(θ)", "logₐ(xy) = logₐx + logₐy",
  "e^{iπ} + 1 = 0", "P(A ∩ B) = P(A) · P(B)", "V = ⅓πr²h", "C = 2πr", "A = πr²",
  "F = ma", "E = mc²", "x ∈ ℝ \\ {0}", "∀x ∈ ℕ, x ≥ 1", "∇ · E = ρ/ε₀", "∂²u/∂t² = c²∂²u/∂x²",
  "x ≡ a (mod n)", "n! = n · (n-1)!", "∑_{n=1}^∞ 1/n² = π²/6", "P(A|B) = P(A ∩ B)/P(B)",
  "z = x + iy", "∫ e^x dx = e^x + C", "g(x) = |x - 3|", "θ = arccos(x/r)"
];

async function loadCourses() {
  const lessonGrid = document.getElementById('lessonGrid');
  try {
    const res = await fetch('/courses/list.json');
    const courses = await res.json();
    courses.forEach(course => {
      const card = document.createElement('div');
      card.className = 'lesson-card';
      card.addEventListener('click', () => {
        window.location.href = `/course/${course.id}`;
      });

      const title = document.createElement('div');
      title.className = 'lesson-title';
      title.textContent = course.name;

      const rating = document.createElement('div');
      rating.className = 'rating';
      for (let j = 0; j < 5; j++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (j < course.difficulty ? ' active' : '');
        rating.appendChild(dot);
      }

      card.appendChild(title);
      card.appendChild(rating);
      lessonGrid.appendChild(card);
    });
  } catch (e) {
    console.error('Failed to load courses', e);
    const err = document.createElement('div');
    err.textContent = 'Failed to load courses.';
    lessonGrid.appendChild(err);
  }
}

loadCourses();

for (let i = 0; i < 20; i++) {
  const eq = document.createElement('div');
  eq.className = 'equation';
  eq.textContent = equations[i % equations.length];
  eq.style.top = Math.random() * 90 + '%';
  eq.style.left = Math.random() * 90 + '%';
  eq.style.animationDuration = (8 + Math.random() * 6) + 's';
  document.body.appendChild(eq);
}