const createElement = (arr) =>{
    const htmlElements = arr.map(el=> `<span class = "btn"> ${el} </span>`);
    return(htmlElements.join(" "));

}


const loadLesson = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)    //promise to response
        .then((res) => res.json())
        .then((json) => {
            displayLessons(json.data);
           
        });
};
const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"))
}

const loadLevelWord = (id) => {

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active")
            displayLevelWord(data.data);
        });
};

const loadWordDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);

};
const displayWordDetails = (word) =>{
    console.log(word);
    const detailBox = document.getElementById("details-container");
     detailBox.innerHTML =`
     <div>
          <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronounciation})</h2>
        </div>

        <div>
          <h2 class="font-bold">Meaning</h2>
          <p> ${word.sentence}</p>
        </div>

        <div>
          <h2 class="font-bold">Example</h2>
          <p>Lorem, ipsum dolor.</p>
        </div>

        <div>
          <h2 class="font-bold">Synonym</h2>
        <div class = "">${createElement(word.synonym)} </div>
        </div>
     
     ` ;
    document.getElementById("my_modal_5").showModal();

}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words == 0) {
        wordContainer.innerHTML = `
       
         <div class="text-center bg-sky-200 col-span-full rounded-xl py-10 space-y-6 font-bangla">
      <img class = "mx-auto" src="./assets/alert-error.png" >
             <p class="text-xl font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
             <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>`;
        return;
    }
    words.forEach((word) => {
        const card = document.createElement("div");
        card.innerHTML = `
         
     <div class="bg-white rounded-md text-center shadow-md py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "No Bangla meaning is available for this word."}</h2>
        <p class="font-semibold">meaning or pronounciation</p>
        <div class="text-2xl font-medium font-bangla">" ${word.meaning ? word.meaning : "there is no available meaning in this word"} /${word.pronounciation ? word.pronounciation : "there is no pronounciation in this word"}"</div> 
        <div class="flex justify-between items-center">
            <button onclick ="loadWordDetail(${word.id})" class="btn bg-[#1a91ff10]  hover:bg-[#1a91ff90]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn  bg-[#1a91ff10] hover:bg-[#1a91ff90]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
     </div>
        `
        wordContainer.append(card)
    });
};

const displayLessons = (lessons) => {
    // get the container and empty the container 
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for (let lesson of lessons) {
        console.log(lesson);
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
<i class="fa-brands fa-leanpub"></i> Lesson ${lesson.level_no}
</button>
`;

        levelContainer.append(btnDiv);
    }


}
loadLesson()
