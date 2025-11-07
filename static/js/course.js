async function fetchCourse(courseId) {
  const res = await fetch(`/courses/${courseId}.json`);
  if (!res.ok) throw new Error('Course not found');
  return res.json();
}

function renderDifficulty(container, n) {
  container.innerHTML = '';
  for (let j = 0; j < 5; j++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (j < n ? ' active' : '');
    container.appendChild(dot);
  }
}

function renderSlide(state) {
  const slide = state.course.slides[state.index];
  document.getElementById('slideTitle').textContent = slide.title;
  document.getElementById('slideBody').textContent = slide.body;
  document.getElementById('progress').textContent = `${state.index + 1} / ${state.course.slides.length}`;
  document.getElementById('prevBtn').disabled = state.index === 0;
  const isLast = state.index === state.course.slides.length - 1;
  document.getElementById('nextBtn').textContent = isLast ? 'Start Quiz' : 'Next';
}

function showSlides() {
  document.getElementById('slides').classList.remove('hidden');
  document.getElementById('quiz').classList.add('hidden');
}

function showQuiz() {
  document.getElementById('slides').classList.add('hidden');
  document.getElementById('quiz').classList.remove('hidden');
}

function buildQuiz(quizData) {
  const container = document.getElementById('quizContainer');
  container.innerHTML = '';
  quizData.questions.forEach((q, qi) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'q';
    const qTitle = document.createElement('div');
    qTitle.textContent = `${qi + 1}. ${q.q}`;
    const choices = document.createElement('div');
    choices.className = 'choices';
    q.choices.forEach((c, ci) => {
      const id = `q${qi}_c${ci}`;
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q_${qi}`;
      input.value = ci;
      input.id = id;
      const span = document.createElement('span');
      span.textContent = c;
      label.appendChild(input);
      label.appendChild(span);
      choices.appendChild(label);
    });
    qDiv.appendChild(qTitle);
    qDiv.appendChild(choices);
    container.appendChild(qDiv);
  });
}

function gradeQuiz(quizData) {
  let correct = 0;
  quizData.questions.forEach((q, qi) => {
    const sel = document.querySelector(`input[name="q_${qi}"]:checked`);
    if (sel && Number(sel.value) === q.answerIndex) correct++;
  });
  return { correct, total: quizData.questions.length };
}

(async function init() {
  const courseId = window.__COURSE_ID__;
  const titleEl = document.getElementById('courseTitle');
  const diffEl = document.getElementById('difficulty');
  try {
    const course = await fetchCourse(courseId);
    titleEl.textContent = course.name;
    renderDifficulty(diffEl, course.difficulty);

    const state = { course, index: 0 };
    renderSlide(state);
    showSlides();

    document.getElementById('prevBtn').addEventListener('click', () => {
      if (state.index > 0) {
        state.index--;
        renderSlide(state);
      }
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
      const last = state.index === state.course.slides.length - 1;
      if (!last) {
        state.index++;
        renderSlide(state);
      } else {
        buildQuiz(state.course.quiz);
        showQuiz();
      }
    });

    document.getElementById('submitQuiz').addEventListener('click', () => {
      const result = gradeQuiz(state.course.quiz);
      const percent = Math.round((result.correct / result.total) * 100);
      document.getElementById('quizResult').textContent = `Score: ${result.correct}/${result.total} (${percent}%)`;
    });
  } catch (e) {
    titleEl.textContent = 'Course not found';
    console.error(e);
  }
})();
