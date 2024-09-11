import React from 'react';
import GenericForm from './GenericForm/GenericForm';
import EventFields from './eventCreationFields';

const EventCreationForm = ({ onSubmit }) => {

  const handleSubmit = async (formData) => {
    const selectedValue = formData.eventCategory;

    if (selectedValue === '' || selectedValue === 'invalid') {
      alert('Please Select A Valid Event Category');
      return false;
    }

    console.log('Creating event:', formData);

    try {
      const eventImageFile = formData.eventImage;
      const reader = new FileReader();
      reader.readAsDataURL(eventImageFile);
      reader.onloadend = async () => {
        const base64EventImage = reader.result;
        formData.eventImage = base64EventImage;

        const response = await fetch('/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          alert('Event created successfully');
          if (onSubmit) {
            onSubmit(data);
          }
        } else {
          const data = await response.json();
          alert('Failed to create event: ' + data.message);
        }
      };
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event: ' + error.message);
    }

    return true;
  };



  return (
    <GenericForm
      title="Create an Event"
      fields={EventFields}
      onSubmit={handleSubmit}
      action="Create Event"
      width="666px"
    />
  );
};

export default EventCreationForm;