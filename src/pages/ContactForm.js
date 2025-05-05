import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner, Progress } from 'reactstrap';
import axios from 'axios';
import './contact.css';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../App';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    description: '',
    category: '',
    attachments: null,
    acknowledge: false, // New state for acknowledgment checkbox
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [attachmentProgress, setAttachmentProgress] = useState(0);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const storeinfo = localStorage.getItem('isVerified');
  const isVerified = storeinfo === 'true';
  const { t } = useTranslation();


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));

    // If a file is selected, handle its upload progress
    if (name === 'attachments' && files) {
      const file = files[0];
      setUploadingAttachment(true);
      const reader = new FileReader();

      reader.onloadstart = () => {
        setAttachmentProgress(0);
      };

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total);
          setAttachmentProgress(progress);
        }
      };

      reader.onloadend = () => {
        setUploadingAttachment(false);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset alert messages
    setAlertMessage('');
    setAlertType('');

    // Check if the acknowledgment checkbox is checked
    if (!formData.acknowledge) {
      setAlertMessage(t('contact.acknowledge_info'));
      setAlertType('warning');
      return;
    }

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create a FormData object to send the form data
    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);

    if (formData.attachments) {
      formDataToSend.append('attachment', formData.attachments);
    }

    try {
      setLoading(true); // Start loading spinner
      setUploadProgress(0); // Reset progress bar

      // Send POST request to the server with Authorization header
      await axios.post(`${API_URL}/api/contact`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the headers
          'Content-Type': 'multipart/form-data', // Explicitly set Content-Type
        },
        onUploadProgress: (progressEvent) => {
          // Calculate and set the overall upload progress
          const { loaded, total } = progressEvent;
          const progress = Math.round((loaded * 100) / total);
          setUploadProgress(progress);
        },
      });

      // Handle success response
      setAlertMessage(t('contact.message_sent_success'));
      setAlertType('success');

      // Clear form data and file input
      setFormData({
        email: '',
        subject: '',
        description: '',
        category: '',
        attachments: null,
        acknowledge: false, // Reset acknowledgment checkbox
      });

      // Reset file input value manually
      document.getElementById('attachments').value = '';

    } catch (error) {
      // Log the error for debugging
      console.error('Error submitting contact form:', error.response?.data || error.message);

      // Handle error response
      setAlertMessage(t('contact.message_send_error'));
      setAlertType('danger');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className={`container d-flex align-items-center justify-content-center min-vh-100 contact-us ${!isVerified ? 'animate-center-out' : ''}`}>
    <div className="col-md-6">
      <h1 className="mb-4 text-center"><strong>{t('contact.contact_us_title')}</strong></h1>

      {alertMessage && (
        <Alert color={alertType} className="mt-3">
          {alertMessage}
        </Alert>
      )}

      {loading && (
        <div className="text-center mt-3">
          <Spinner color="primary" /> {/* Show spinner while loading */}
        </div>
      )}

      {uploadProgress > 0 && !loading && !uploadingAttachment && (
        <div className="mt-3">
          <Progress value={uploadProgress} />
        </div>
      )}

      {uploadingAttachment && (
        <div className="mt-3">
          <Label for="attachmentProgress">{t('contact.attachment_upload_progress_label')}</Label>
          <Progress value={attachmentProgress} />
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">
            {t('contact.email_label')} <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder={t('contact.email_placeholder')}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="subject">
            {t('contact.subject_label')} <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="text"
            name="subject"
            id="subject"
            placeholder={t('contact.subject_placeholder')}
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">
            {t('contact.description_label')} <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder={t('contact.description_placeholder')}
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: '100%', minHeight: '200px' }} // Adjust width and height as needed
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">
            {t('contact.category_label')} <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="select"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">{t('contact.category_options.select_category')}</option>
            <option value="Survey">{t('contact.category_options.survey')}</option>
            <option value="Watching Videos">{t('contact.category_options.watching_videos')}</option>
            <option value="Sign Up Offers">{t('contact.category_options.sign_up_offers')}</option>
            <option value="Other">{t('contact.category_options.other')}</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="attachments">{t('contact.attachments_label')}<span style={{ color: 'red' }}>*</span></Label>
          <Input
            type="file"
            name="attachments"
            id="attachments"
            onChange={handleChange}
            accept="image/jpeg, image/png" // Restrict file types to JPEG and PNG
            required
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="acknowledge"
              id="acknowledge"
              checked={formData.acknowledge}
              onChange={handleChange}
              required
            />{' '}
            {t('contact.acknowledge_label')} <span style={{ color: 'red' }}>*</span>
          </Label>
        </FormGroup>
        <Button type="submit" color="primary" className="mt-3">
          {t('contact.submit_button')}
        </Button>
      </Form>
      </div>
    </div>
  );
};

export default ContactForm;
