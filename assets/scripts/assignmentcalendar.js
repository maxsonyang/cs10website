/*
    This file contains all the stuff you need to 
    generate "week-by-week" content. For example,
    the assignment calendar row content would be
    an example.
*/

// Important Globals for important events.
import { CONTENT_STRUCTURE } from './coredata/contentstructure.js'
import { DISCUSSION_DATA } from './coredata/discussiondata.js'
import { LAB_DATA } from './coredata/labdata.js'
import { LECTURE_DATA } from './coredata/lecturedata.js'

const LAB_ICONS = 
[
    'computer',
    'queue'
]

const DISC_ICONS = 
[
    'create',
    'done_all'
]

const LECTURE_ICONS = 
[
    'videocam',
    'description'
]

const LABS_PER_WEEK = 3;
const DISCUSSION_PER_WEEK = 2;
const LECTURES_PER_WEEK = 3;
const NUM_WEEKS = 8;

/*
    Slightly more abstracted methods for rendering Schedule Content.
*/

function createAssignmentCalendar()
{
    let assignmentCalendar = document.getElementById("assignmentCal");
    for (let week = 1; week <= NUM_WEEKS; week++)
    {
        var card = makeDiv("card vertical");
        var weekHeader = makeDiv("calendarHeader");
        weekHeader.innerText = "Week " + week;

        var weekContent = createWeekScheduleContent(week);
        card.append(weekHeader);
        card.append(weekContent);

        assignmentCalendar.append(card);
    }
}

// This method creates one week's worth of content.
// Also I know this really isn't supposed to be here since there's another file. But eh.
function createWeekScheduleContent(weekNumber)
{
    var contentContainer = makeDiv("horizontalContent");

    let lectKeys = CONTENT_STRUCTURE[weekNumber]["lectures"];
    let labKeys = CONTENT_STRUCTURE[weekNumber]["labs"];
    let discKeys = CONTENT_STRUCTURE[weekNumber]["discussion"]


    contentContainer.appendChild(createLectureScheduleContent(weekNumber, lectKeys));
    contentContainer.appendChild(createLabScheduleContent(weekNumber, labKeys));
    contentContainer.appendChild(createDiscussionScheduleContent(weekNumber, discKeys));

    return contentContainer;
}

// NOTE: These methods create a whole COLUMN.

function createLectureScheduleContent(weekNumber, lectKeys)
{
    var scheduleContent = makeDiv("scheduleContent");
    var header = document.createElement("h3");
    header.className = "contentHeader";
    header.innerText = "Lectures"

    scheduleContent.appendChild(header);

    let contentNumbers = calculateContentNumbering(weekNumber, LECTURES_PER_WEEK);

    for (let i = 0; i < LECTURES_PER_WEEK; i++)
    {
        let lectKey = lectKeys[i];
        if (lectKey) {
            scheduleContent.appendChild(createLectureContent(contentNumbers[i], lectKey));
        }
    }

    return scheduleContent;
}

function createDiscussionScheduleContent(weekNumber, discKeys)
{
    var scheduleContent = makeDiv("scheduleContent");
    var header = document.createElement("h3");
    header.className = "contentHeader";
    header.innerText = "Discussion"

    scheduleContent.appendChild(header);

    let contentNumbers = calculateContentNumbering(weekNumber, DISCUSSION_PER_WEEK);

    for (let i = 0; i < DISCUSSION_PER_WEEK; i++)
    {
        let discKey = discKeys[i];
        if (discKey) {
            scheduleContent.appendChild(createDiscussionContent(contentNumbers[i], discKey));
        }
    }

    return scheduleContent;
}

function createLabScheduleContent(weekNumber, labKeys)
{
    var scheduleContent = makeDiv("scheduleContent");
    var header = document.createElement("h3");
    header.className = "contentHeader";
    header.innerText = "Labs"

    scheduleContent.appendChild(header);

    let contentNumbers = calculateContentNumbering(weekNumber, LABS_PER_WEEK);

    for (let i = 0; i < LABS_PER_WEEK; i++)
    {
        let labKey = labKeys[i];
        console.log(labKey);
        if (labKey) {
            scheduleContent.appendChild(createLabContent(contentNumbers[i], labKey));
        }
    }

    return scheduleContent;
}

// Helper for calculating content numbers
function calculateContentNumbering(weekNumber, weeklyCount)
{
    var contentNums = [];
    for (let i = 1; i <= weeklyCount; i++)
    {
        let number = i + (weeklyCount * (weekNumber - 1));
        contentNums.push(number);
    }
    return contentNums;
}

// NOTE: these methods create an individual piece of content. NOT A WHOLE COLUMN.

function createLectureContent(
    lectNumber, lectKey
)
{
    let lecture = LECTURE_DATA[lectKey];
    let lectName = lecture["title"];
    let lectSubtitle = "It's literally all Dan";
    let lectLabels = [
        "webcast",
        "slides"
    ];
    let lectLinks = [
        lecture["webcast"],
        lecture["slides"]
    ];

    return createContentItem(
        "Lecture " + lectNumber, lectName, lectSubtitle,
        lectLabels, LECTURE_ICONS, lectLinks
    );
}

function createDiscussionContent(
    discNumber, discKey
)
{
    let discussion = DISCUSSION_DATA[discKey];
    let discName = discussion["title"];
    let discLabels = [
        "worksheet",
        "solutions"
    ];
    let discLinks = [
        discussion["worksheet"],
        discussion["solution"]
    ];

    return createContentItem(
        "Discussion " + discNumber, discName, null,
        discLabels, DISC_ICONS, discLinks
    );
}

function createLabContent(
    labNumber, labKey
)
{
    console.log(labKey);
    let lab = LAB_DATA[labKey];
    let labName = lab["title"];
    // TODO: FIX THIS GARBAGE!!! >:(
    let labSubtitle = "Due... eventually"
    let labLabels = ['lab', 'checkoff'];
    let labLinks = [
        lab["link"],
        "../html/labs/#" + labNumber
    ];

    return createContentItem(
        "Lab " + labNumber, labName, labSubtitle,
        labLabels, LAB_ICONS, labLinks
    );
}


function createContentItem(
    itemNum, itemName, itemSubtitle,
    labels, iconNames, iconLinks
) {
    /*
        Code for composing a Content Item.
        A content item represents one piece of content on the schedule.
        This is understood commonly as a lecture, a lab, a discussion, etc.
        
        Note, I don't think you should really be calling this method directly.
        Rather, if you are introducing a new form of content, defining a new
        function or schema would be far more powerful.
    */
    var scheduleContentDiv = makeDiv('scheduleContent');
    var contentItem = makeDiv('contentItem');

    let contentTitle = createTitle(itemNum, itemName, itemSubtitle);
    let iconBar = createIconBar(labels, iconNames, iconLinks);



    contentItem.appendChild(contentTitle);
    contentItem.appendChild(iconBar);
    scheduleContentDiv.append(contentItem);

    return scheduleContentDiv
}


/*
    Title rendering code.
*/

function createTitle(itemNum, itemName, itemSubtitle) 
{
    /*
        This portion of the code is responsible for creating the 
        title/headers you see on things like the lecture, lab, and
        discussion content.

        The label and icons are separate divs, so they need to be
        initialized separately. 
    */

    // Initialize the container div.
    var titleDiv = makeDiv("itemTitle");
    var itemNameDiv;

    if (itemName.length > 16) {
        itemNameDiv = makeDiv("itemName-small");
    } else {
        itemNameDiv = makeDiv("itemName");
    }
    

    // Initialize the content
    var itemNumDiv = makeDiv('itemNum');
    var itemSubtitleDiv = makeDiv('itemSubtitle');

    // TODO: fix in future cuz directly appending is a security vulnerability.
    itemNumDiv.innerText += itemNum;
    itemNameDiv.innerText += itemName;
    itemSubtitleDiv.innerText += itemSubtitle;

    titleDiv.appendChild(itemNumDiv);
    titleDiv.appendChild(itemNameDiv);
    titleDiv.appendChild(itemSubtitleDiv);

    return titleDiv;
}
/*
    Icon Bar Rendering Code.
*/

function createIconBar(labels, iconNames, iconLinks) 
{ 
    /*
        This creates the icon bar for one item.
        All links should be provided; if there's less links than icons
        then please include a null value or something.
    */
    var itemIconsDiv = makeDiv('itemIcons');

    if (labels.length != iconNames.length) {

        console.log('Number of Labels does not match the number of icons!')
        console.log('Label count: ' + labels.length);
        console.log('Icon count: ' + iconNames.length);

    } else {

        for (let i = 0; i < labels.length; i++)
        {
            let label = createLabel(labels[i], iconNames[i]);
            let aElement = document.createElement('a');
            aElement.appendChild(label);
            aElement.href = iconLinks[i];
            itemIconsDiv.appendChild(aElement);
        }

        return itemIconsDiv;
    }

}

function createLabel(labelTitle, iconName) 
{
    /*
        This creates a label, which is a combination of:
            - an icon span.
            - a div containing the name of the particular label. 
                e.g. lab, checkoffs, webcast.
    */
    var labelDiv = makeDiv('label');
    var icon = makeIconSpan(iconName);
    var title = document.createElement('div');
    title.innerText = labelTitle;

    labelDiv.appendChild(icon);
    labelDiv.appendChild(title);

    return labelDiv;
}

function makeDiv(name, isID)
{
    /* 
        Creates a new div. Sets the name to an ID if isID is flagged true.
        Otherwise sets classname; there are much more classes than IDs so
        that's why there's an isID flag vs. the other way around.
    */
    var newDiv = document.createElement('div');
    if (!isID) {
        newDiv.className = name;
    } else {
        newDiv.id = name;
    }
    return newDiv
}

function makeIconSpan(iconName) 
{
    /*
        This method creates one icon.
        Icon names are based off of google material icons.
        You can find all of them by looking up Google Material icons!
        There are also different variants of the same icons specified by
        the class name.  In particular, we're using rounded icons.
    */
    var iconSpan = document.createElement('span');
    iconSpan.className = 'material-icons-round';
    iconSpan.innerText = iconName;

    return iconSpan;
}

/*
    This part of the code actually makes the changes to the html.
*/
let weekContent = document.getElementById("weekContent");
weekContent.replaceWith(createWeekScheduleContent(1));
createAssignmentCalendar();




