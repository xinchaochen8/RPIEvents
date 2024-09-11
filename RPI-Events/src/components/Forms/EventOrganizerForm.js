import React from 'react';
import GenericForm from './GenericForm/GenericForm';
import fields from './eventOrganizerFields';

export default function EventOrganizerForm({ onSubmit }) {
  const handleSubmit = (formData) => {
    alert(
      `Successfully submitted:
      Full Name: ${formData.fullName}
      Organization: ${formData.organization}
      Contact Info: ${formData.contactInfo}`
    );
  
    if (onSubmit) {
      onSubmit(formData); // This will only be executed if the condition is not met
    }
    return true;
  };

    return (
    <GenericForm
      title="Register as an Organizer"
      fields={fields}
      onSubmit={handleSubmit}
      action="Register as an Organizer"
      width="666px"
    />
  );
}


/*
  Things to talk about for server file:
  - How do we get the API token
  - Have you all been able to make requests to it on the frontend
  - How to use auth
*/