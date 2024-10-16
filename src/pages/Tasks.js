import React, { useRef } from 'react';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HandlePageClick } from '../App';

const Tasks = () => {
  const storeinfo = localStorage.getItem('isVerified');
  const isLoggedIn = storeinfo === 'true';
  const ref = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const tasks = [
    {
      id: 1,
      title: t('task.survey_title'),
      description: t('task.survey_description'),
      image: 'https://od.lk/s/NjFfODI4MTUwOTZf/person%20survey.jpeg',
      onClick: (e) => HandlePageClick(e, isLoggedIn ? '/survey-tasks' : '/signup', ref, navigate),
    },
    {
      id: 2,
      title:  t('task.play_title'),
      description: t('task.play_description'),
      image: 'https://od.lk/s/NjFfODc4NTMzOTJf/cdf9b870-4750-47e1-b88b-05d8837763e3.png',
      onClick: (e) => HandlePageClick(e, isLoggedIn ? '/bitlabs-offers' : '/signup', ref, navigate),
    },
    {
      id: 3,
      title: t('task.offer_title'),
      description: t('task.offer_description'),
      image: 'https://od.lk/s/NjFfODI4MTUwOTVf/people%20dollar.jpg',
      onClick: (e) => HandlePageClick(e, isLoggedIn ? '/cpalead' : '/signup', ref, navigate),
    },
  ];

  return (
    <div className={`container mt-5 about-us ${!isLoggedIn ? 'animate-center-out' : ''}`}>
      <h1 className="mb-4">{t('homepage.tasks_title')}</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Tasks;
