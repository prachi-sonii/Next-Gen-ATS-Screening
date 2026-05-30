// script.js

const form =
document.getElementById("resumeForm");

const loader =
document.getElementById("loader");

const resultBox =
document.getElementById("resultBox");

const skillsContainer =
document.getElementById("skillsContainer");

const suggestionList =
document.getElementById("suggestionList");

const scoreText =
document.getElementById("scoreText");

const circleScore =
document.getElementById("circleScore");

const skillsCount =
document.getElementById("skillsCount");

const missingSkillsDiv =
document.getElementById("missingSkills");

/* CARD HOVER */

const cards =
document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform =
        "translateY(-6px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =
        "translateY(0px)";

    });

});

/* FORM */

form.addEventListener("submit",function(e){

    e.preventDefault();

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const resumeFile =
    document.getElementById("resume").files[0];

    const jobDescription =
    document.getElementById("jobDescription")
    .value.toLowerCase();

    if(name==="" || email===""
        || !resumeFile || jobDescription===""){

        alert("Please fill all details");

        return;

    }

    resultBox.style.display="none";

    loader.style.display="block";

    const reader =
    new FileReader();

    reader.onload=function(event){

        const resumeText =
        event.target.result.toLowerCase();

        /* ALL SKILLS */

        const allSkills=[

            "java",
            "python",
            "sql",
            "html",
            "css",
            "javascript",
            "react",
            "spring boot",
            "mysql",
            "mongodb",
            "nodejs",
            "flask",
            "django",
            "git",
            "rest api",
            "c",
            "c++"

        ];

        /* DETECTED */

        let detectedSkills=[];

        allSkills.forEach(skill=>{

            if(resumeText.includes(skill)){

                detectedSkills.push(skill);

            }

        });

        /* MISSING */

        let missingSkills=[];

        allSkills.forEach(skill=>{

            if(
                jobDescription.includes(skill)
                &&
                !detectedSkills.includes(skill)
            ){

                missingSkills.push(skill);

            }

        });

        /* ATS SCORE */

        let matched=0;

        detectedSkills.forEach(skill=>{

            if(jobDescription.includes(skill)){

                matched++;

            }

        });

        let atsScore =
        Math.floor(
            (matched/allSkills.length)*100
        );

        if(atsScore<50){

            atsScore+=40;

        }

        /* LOADING */

        setTimeout(()=>{

            loader.style.display="none";

            resultBox.style.display="block";

            scoreText.innerText =
            atsScore + "% Match";

            circleScore.innerText =
            atsScore + "%";

            skillsCount.innerText =
            detectedSkills.length;

            /* DETECTED */

            skillsContainer.innerHTML="";

            detectedSkills.forEach(skill=>{

                let span =
                document.createElement("span");

                span.innerText=skill;

                skillsContainer
                .appendChild(span);

            });

            /* MISSING */

            missingSkillsDiv.innerHTML="";

            missingSkills.forEach(skill=>{

                let span =
                document.createElement("span");

                span.innerText=skill;

                missingSkillsDiv
                .appendChild(span);

            });

            /* SUGGESTIONS */

            let suggestions=[];

            if(!resumeText.includes("project")){

                suggestions.push(
                "Add project section");

            }

            if(!resumeText.includes("internship")){

                suggestions.push(
                "Add internship experience");

            }

            if(!resumeText.includes("certification")){

                suggestions.push(
                "Add certifications");

            }

            if(detectedSkills.length<5){

                suggestions.push(
                "Add more technical skills");

            }

            if(suggestions.length===0){

                suggestions.push(
                "Excellent Resume");

            }

            suggestionList.innerHTML="";

            suggestions.forEach(item=>{

                let li =
                document.createElement("li");

                li.innerText=item;

                suggestionList
                .appendChild(li);

            });

        },2500);

    }

    reader.readAsText(resumeFile);

});