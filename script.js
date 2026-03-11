const loadLesson = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)    //promise to response
        .then((res) => res.json())
        .then((json) => {
            displayLessons(json.data);
        });
};
const loadLevelWord = (id) => {

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayLevelWord(data.data);
        });
};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    words.forEach((word) => {
        const card = document.createElement("div");
        card.innerHTML = `
         
     <div class="bg-white rounded-md text-center shadow-md py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-semibold">meaning or pronounciation</p>
        <div class="text-2xl font-medium font-bangla">" ${word.meaning} /${word.pronounciation}"</div> 
        <div class="flex justify-between items-center">
            <button class="btn bg-[#1a91ff10]  hover:bg-[#1a91ff90]"><i class="fa-solid fa-circle-info"></i></button>
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
                            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary ">
                                <i class="fa-brands fa-leanpub"></i> Lesson${lesson.level_no}
            
        
                             </button>   
                             `
        levelContainer.append(btnDiv);
    }


}
loadLesson()
