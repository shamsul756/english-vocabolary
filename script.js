const loadLesson = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)    //promise to response
        .then((res) => res.json())
        .then((json) => {
            displayLessons(json.data);
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
                            <button class="btn btn-outline btn-primary ">
                                <i class="fa-brands fa-leanpub"></i> Lesson${lesson.level_no}
            
        
                             </button>   
                             `
        levelContainer.append(btnDiv);
    }


}
loadLesson()
