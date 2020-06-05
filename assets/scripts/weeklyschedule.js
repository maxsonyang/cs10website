document.addEventListener('DOMContentLoaded', function () {
    // This gets the weeklyschedule element from index.html
    var scheduleElement = document.getElementById("weekschedule");

    // 
    var calendar = new FullCalendar.Calendar(scheduleElement, {
        // This dictionary is a set of configurations for FullCalendar.
        plugins : [ 
            'timeGrid',
            'googleCalendar',
            'bootstrap'
        ],
        defaultView : 'timeGridWeek',

        // Configuring the Calendar.
        minTime: '08:00:00',
        maxTime: '20:00:00',
        nowIndicator: true,
        
        // Visual Appearances
        height: 'auto',
        themeSystem: 'bootstrap',

        // Google Calendar API stuff.
        // Note that if you might need to change this if you can't see anything on the calendar.
        googleCalendarApiKey: 'AIzaSyAyK99ml8ntWQ4S-EmXv-iIeykY7oioFvk',
        eventSources: [
            { 
                googleCalendarId: 'berkeley.edu_k2g60q1sehd2u0ujd257jqm7h0@group.calendar.google.com',
                className : 'oh-calendar' 
            },
            { 
                googleCalendarId: 'berkeley.edu_1g3duo9lb53vu09orjictriud4@group.calendar.google.com',
                className : 'disc-calendar' 
            },
            { 
                googleCalendarId: 'berkeley.edu_d358eocqj23pak3atie23vk35o@group.calendar.google.com',
                className : 'lab-calendar' 
            },
            { 
                googleCalendarId: 'berkeley.edu_7qpoo4ph13p55e4ukmnpvqusdk@group.calendar.google.com',
                className : 'lect-calendar' 
            }
        ]
    });

    calendar.render();
});