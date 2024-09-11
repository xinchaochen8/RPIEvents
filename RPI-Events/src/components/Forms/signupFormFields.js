const handleTermsClick = () => {
  alert('Terms and Conditions', 'These are the terms and conditions');
};
const fields = [
  {
    label: 'Email:',
    type: 'text',
    name: 'email',
    placeholder: 'Enter Email',
    required: true
  },
  {
    label: 'Password:',
    type: 'password',
    name: 'password',
    placeholder: 'Enter Password',
    required: true
  },
  {
    label: 'Confirm Password:',
    type: 'password',
    name: 'confirmpassword',
    placeholder: 'Enter Confirm Password',
    required: true
  },
  {
    label: 'Profile Image (JPEG ONLY):',
    type: 'file',
    name: 'profileImage',
    required: false
  },
  {
    label: (
      <span>
        I agree to the&nbsp;
        <span style={{ color: 'blue', cursor: 'pointer' }}>terms and conditions</span>
      </span>
    ),
    type: 'checkbox',
    name: 'termsAndConditions',
    required: true
  }
];

export default fields;
