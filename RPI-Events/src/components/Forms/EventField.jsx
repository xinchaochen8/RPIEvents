const EventFields = [
    {
        label: 'Event Name',
        type: 'text',
        name: 'eventName',
        placeholder: 'Enter event name',
        required: true,
    },
    {
        label: 'Event Date',
        type: 'date',
        name: 'eventDate',
        placeholder: 'Select event date',
        required: true,
    },
    {
        label: 'Event Duration (hours)',
        type: 'number',
        name: 'eventDuration',
        placeholder: 'Enter event duration',
        minNum: 0,
        step: 0.25,
        required: true,
    },
    {
        label: 'Event Location',
        type: 'text',
        name: 'eventLocation',
        placeholder: 'Enter event location',
        required: true,
    },
    {
        label: 'Total Seats Available',
        type: 'number',
        name: 'totalSeats',
        placeholder: 'Enter total seats available',
        minNum: 1,
        step: 1,
        required: true,
    },
    {
        label: 'Event Description',
        type: 'textarea',
        name: 'eventDescription',
        placeholder: 'Enter event description',
        required: true,
    },
    {
        label: 'Event Image',
        type: 'file',
        name: 'eventImage',
        placeholder: 'Upload an image for the event',
        required: false,
    },
    {
        label: 'Event Types',
        type: 'select',
        name: 'eventTypes',
        placeholder: 'Select event types',
        required: true,
        options: [
            { label: 'Selete Event Type', value: 'invalid' },

            { label: 'Academic', value: 'academic' },
            { label: 'Sports', value: 'sports' },
            { label: 'Workshop', value: 'workshop' },
        ],
    }
];

export default EventFields;