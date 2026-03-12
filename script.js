const createElement = (arr) => {
    if (!arr) return "";
    const htmlElements = arr.map(el => `<span class="btn btn-xs"> ${el} </span>`);
    return htmlElements.join(" ");
};

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
    const spinner = document.getElementById("spinner");
    const container = document.getElementById("word-container");
    if (status) {
        spinner.classList.remove("hidden");
        container.classList.add("hidden");
    } else {
        spinner.classList.add("hidden");
        container.classList.remove("hidden");
    }
};

const loadLesson = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then((res) => res.json())
        .then((json) => displayLessons(json.data))
        .catch(err => console.error("Error loading lessons:", err));
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("btn-active", "bg-primary", "text-white"));
};

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            if (clickBtn) clickBtn.classList.add("btn-active", "bg-primary", "text-white");
            displayLevelWord(data.data);
        });
};

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
    const detailBox = document.getElementById("details-container");
    detailBox.innerHTML = `
        <div>
          <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</h2>
        </div>
        <div>
          <h2 class="font-bold">Meaning</h2>
          <p>${word.meaning}</p>
        </div>
        <div>
          <h2 class="font-bold">Synonym</h2>
          <div class="flex flex-wrap gap-2">${createElement(word.synonym)}</div>
        </div>
    `;
    document.getElementById("my_modal_5").showModal();
};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    
    if (!words || words.length === 0) {
        wordContainer.innerHTML = `
            <div class="text-center bg-sky-200 col-span-full rounded-xl py-10 space-y-6">
                <p class="text-xl font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
            </div>`;
        manageSpinner(false);
        return;
    }

    words.forEach((word) => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-md text-center shadow-md py-10 px-5 space-y-4";
        card.innerHTML = `
            <h2 class="font-bold text-2xl">${word.word || "No Word"}</h2>
            <div class="text-lg font-medium">"${word.meaning || 'N/A'} / ${word.pronunciation || 'N/A'}"</div> 
            <div class="flex justify-center gap-4">
                <button onclick="loadWordDetail('${word.id}')" class="btn btn-circle btn-ghost bg-blue-50">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button onclick="pronounceWord('${word.word}')" class="btn btn-circle btn-ghost bg-blue-50">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        `;
        wordContainer.append(card);
    });
    manageSpinner(false);
};

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    lessons.forEach(lesson => {
        const btn = document.createElement("button");
        btn.id = `lesson-btn-${lesson.level_no}`;
        btn.className = "btn btn-outline btn-primary lesson-btn";
        btn.innerHTML = `<i class="fa-brands fa-leanpub"></i> Lesson ${lesson.level_no}`;
        btn.onclick = () => loadLevelWord(lesson.level_no);
        levelContainer.append(btn);
    });
};

loadLesson();

document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();
    const searchValue = document.getElementById("input-search").value.toLowerCase();
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const filterWords = data.data.filter(word => 
                word.word.toLowerCase().includes(searchValue)
            );
            displayLevelWord(filterWords);
        });
});
loadLesson();