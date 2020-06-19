import '../staff/bios.js'
import { aaronBio, yolandaBio, daniBio, kellyannBio, samhitaBio } from '../staff/bios.js';

let staffData = {
    "aaron" : aaronBio,
    "yolanda" : yolandaBio,
    "dani" : daniBio,
    "kellyann" : kellyannBio,
    "samhita" : samhitaBio
}

// This is rinkydink. Fix later.
let staffNames = {
    "aaron" : "Aaron Baker",
    "yolanda" : "Yolanda Shen",
    "dani" : "Dani Swords",
    "kellyann" : "Kellyann Ye",
    "samhita" : "Samhita Sen"
}

export function removeOverlay() 
{
    let overlay = document.getElementById("overlay");
    overlay.removeChild(overlay.getElementsByClassName("card")[0]);
    overlay.style.display = "none";

}

export function displayOverlay(name, imageLink) {
    let overlay = document.getElementById("overlay");
    let overlayCard = document.createElement("div");
    overlayCard.onclick = "noFire()";
    overlayCard.className = "card";

    let overlayHeader = makeOverlayHeader(name, imageLink, []);
    let overlayBody = makeOverlayBody(name);

    overlayCard.appendChild(overlayHeader);
    overlayCard.appendChild(overlayBody);

    overlay.append(overlayCard);

    overlay.style.display = "flex";
}

function noFire() {
    event.stopPropagation();
}

function makePortrait(imageLink)
{
    let imageDiv = document.createElement("img");
    imageDiv.src = imageLink;
    imageDiv.className = "overlayPicture";

    return imageDiv;
}

function makeOverlayHeader(name, imageLink, extraDetails) // JavaScript is a garbage language.
{
    // Header Div is the main div.
    let headerDiv = document.createElement("div");
    headerDiv.className = "overlayHeader";

    // Make the profile picture
    let portrait = makePortrait(imageLink);

    // Add on name
    let headerContentDiv = document.createElement("div");
    let headerName = document.createElement("h1");
    headerName.innerText = staffNames[name];

    headerContentDiv.appendChild(headerName);

    // Add additional 
    for (let i = 0; i < extraDetails.length; i++)
    {
        let extraDetail = document.createElement("h3");
        extraDetail.innerText(extraDetails[i]);

        headerContentDiv.appendChild(extraDetail);
    }

    headerDiv.appendChild(portrait);
    headerDiv.append(headerContentDiv);

    return headerDiv;
}

function makeOverlayBody(name)
{

    let overlayBody = document.createElement("div");
    
    let questions = [
        "Where are you from? What was your path to Cal?",
        "How much programming have you done? What languages?",
        "What are your hobbies?",
        "Have you done anything remarkable? Has anything memorable happened to you?",
        "What commitments will be consuming your cycles this semester?"
    ];

    let keys = [
        "backstory",
        "experience",
        "hobbies",
        "talents",
        "remarkableStuff",
        "commitments"
    ]

    let personData = staffData[name];

    for (let i = 0; i < questions.length; i++)
    {
        let overlaySection = document.createElement("div");
        overlaySection.className = "overlaySection";
        let questionHeader = document.createElement("h4");
        questionHeader.innerText = questions[i];

        let questionResponse = document.createElement("p");
        questionResponse.innerText = personData[keys[i]];

        overlaySection.appendChild(questionHeader);
        overlaySection.appendChild(questionResponse);

        overlayBody.append(overlaySection);
    }

    return overlayBody;
}

window.displayOverlay = displayOverlay;
window.removeOverlay = removeOverlay;
window.noFire = noFire;
window.staffData = staffData;