const equations = [
  "x ∈ (-∞, 4] ∪ [7, +∞)",
  "x + 2y = 12",
  "f(x) = x² - 3x + 2",
  "∫₀¹ x dx = ½",
  "limₓ→∞ (1 + 1/x)^x = e",
  "a² + b² = c²",
  "y = mx + b",
  "Δx · Δy ≥ ℏ/2",
  "Σᵢ xᵢ / n",
  "d/dx (sin x) = cos x",
  "x³ - 6x² + 11x - 6 = 0",
  "tan(θ) = sin(θ)/cos(θ)",
  "logₐ(xy) = logₐx + logₐy",
  "e^{iπ} + 1 = 0",
  "P(A ∩ B) = P(A) · P(B)",
  "V = ⅓πr²h",
  "C = 2πr",
  "A = πr²",
  "F = ma",
  "E = mc²",
  "x ∈ ℝ \\ {0}",
  "∀x ∈ ℕ, x ≥ 1",
  "∇ · E = ρ/ε₀",
  "∂²u/∂t² = c²∂²u/∂x²",
  "x ≡ a (mod n)",
  "n! = n · (n-1)!",
  "∑_{n=1}^∞ 1/n² = π²/6",
  "P(A|B) = P(A ∩ B)/P(B)",
  "z = x + iy",
  "∫ e^x dx = e^x + C",
  "x ∈ [−2, 5) ∪ (6, 9]",
  "g(x) = |x - 3|",
  "θ = arccos(x/r)"
];
for (let i = 0; i < equations.length; i++) {
  const eq = document.createElement('div');
  eq.className = 'equation';
  eq.textContent = equations[i];
  eq.style.top = Math.random() * 90 + '%';
  eq.style.left = Math.random() * 90 + '%';
  eq.style.animationDuration = (8 + Math.random() * 6) + 's';
  document.body.appendChild(eq);
}