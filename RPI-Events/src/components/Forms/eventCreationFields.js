const eventFields = [
  {
    label: 'Event Name',
    type: 'text',
    name: 'eventName',
    placeholder: 'Enter event name',
    required: true,
  },
  {
    label: 'Event Start Date',
    type: 'datetime-local',
    name: 'eventStartDate',
    placeholder: 'Select event date',
    required: true,
  },
  {
    label: 'Event End Date',
    type: 'datetime-local',
    name: 'eventEndDate',
    placeholder: 'Select event date',
    required: true,
  },
  {
    label: 'Event Recurrence',
    type: 'select',
    name: 'eventRecurrence',
    placeholder: 'Select event recurrence',
    required: true,
    options: [
      { label: 'One-time event', value: 'Not recurring' },
      { label: 'Daily', value: 'Daily' },
      { label: 'Weekly', value: 'Weekly' },
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Annually', value: 'Annually' }
    ]
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
    label: 'Event Category',
    type: 'select',
    name: 'eventCategory',
    placeholder: 'Select event category',
    required: true,
    options: [
      { label: 'Select event category', value: 'invalid' },
      { label: 'Food', value: 'Food' },
      { label: 'Study', value: 'Study' },
      { label: 'Sports', value: 'Sports' },
      { label: 'Career', value: 'Career' },
      { label: 'Music', value: 'Music' }
    ]
  },
  {
    label: 'Use Internal Form?',
    type: 'checkbox',
    name: 'eventInternalForm',
    placeholder: '',
    required: false
  }
];

export default eventFields;