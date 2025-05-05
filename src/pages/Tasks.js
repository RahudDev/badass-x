import React, { useRef } from 'react';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HandlePageClick } from '../App';
import surveyoffers from './assets/survey_offers.jpeg';
import gamesoffers from './assets/games_offers.png';
import signupoffers from './assets/signup_offers.jpg';

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
      image: surveyoffers,
      onClick: (e) => HandlePageClick(e, isLoggedIn ? '/survey-tasks' : '/signup', ref, navigate),
    },
    {
      id: 2,
      title:  t('task.play_title'),
      description: t('task.play_description'),
      image: gamesoffers,
      onClick: (e) => HandlePageClick(e, isLoggedIn ? '/notik-offers' : '/signup', ref, navigate),
    },
    {
      id: 3,
      title: t('task.offer_title'),
      description: t('task.offer_description'),
      image: signupoffers,
      onClick: (e) => HandlePageClick(e, isLoggedIn ? '/cpalead' : '/signup', ref, navigate),
    },
  ];

  return (
    <div className={`container mt-5 about-us ${!isLoggedIn ? 'animate-center-out' : ''}`}>
      <h1 className="mb-4" style={{ textShadow : "2px 2px 4px rgba(0, 0, 0, 0.5)"}}><strong>{t('homepage.tasks_title')}</strong></h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Tasks;
