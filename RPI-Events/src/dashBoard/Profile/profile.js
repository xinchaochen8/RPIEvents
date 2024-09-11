import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';

const Profile = ({ profileData }) => {
  const { photo, username, bio, email, phone } = profileData;

  const imageDataToUrl = (imageData) => {
    if (!imageData) return null;
    const base64String = btoa(
      new Uint8Array(imageData).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleUpdateProfilePicture = async (event) => {
    event.preventDefault();

    const photoFile = event.target.elements.photo.files[0];
    console.log(photoFile);

    if (photoFile.size > 3 * 1024 * 1024) {
      alert('Profile picture size should be at most 3MB');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(photoFile);
    reader.onloadend = async () => {
      const base64Photo = reader.result;

      try {
        const response = await fetch('/users/updateProfileImage', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ NewPhoto: base64Photo })
        });

        if (response.ok) {
          alert('Profile picture updated');
          window.location.reload();
        } else {
          const data = await response.json();
          alert('Failed to update profile picture: ' + data.message);
        }
      } catch (error) {
        console.error('Error updating profile picture:', error);
        alert('Failed to update profile picture: ' + error.message);
      }
    };
  };

  const handleUpdateUsername = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');

    fetch('/user/updateUsernames', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ NewUserName: username }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Username updated');
          window.location.reload();
        } else {
          alert('Failed to update username');
        }
      })
      .catch((error) => {
        console.error('Error updating username:', error);
      });
  };

  return (
    <Card style={{ width: '100%' }} className="border border-white mx-5">
      {photo ? (
        <Card.Img
          variant="top"
          src={imageDataToUrl(photo.data)}
          alt="Profile Image"
          className="rounded-circle mx-auto d-block"
          style={{ width: '150px', height: '150px', marginLeft: '0px' }}
        />
      ) : (
        <div className="m-3">
          <PersonCircle size={150} />
        </div>
      )}

      <ListGroup className="list-group-flush">
        <ListGroupItem>Name: {username}</ListGroupItem>
        <ListGroupItem>Bio: {bio}</ListGroupItem>
        <ListGroupItem>Email: {email}</ListGroupItem>
        <ListGroupItem>Phone: {phone}</ListGroupItem>
      </ListGroup>

      <form onSubmit={handleUpdateProfilePicture}>
        <label htmlFor="photo">Update Profile Picture:</label>
        <input type="file" name="photo" accept="image/*" />
        <button type="submit">Update</button>
      </form>

      <form onSubmit={handleUpdateUsername}>
        <label htmlFor="bio">Update Username:</label>
        <input type="text" name="username" />
        <button type="submit">Update</button>
      </form>
    </Card>
  );
};

export default Profile;
