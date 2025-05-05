import React, {useRef} from 'react';
import TaskList from '../components/TaskList';
import WordSwitchertwo from './wordswitcher_two';
import { HandlePageClick } from '../App';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import surveyoffers from './assets/survey_offers.jpeg';
import gamesoffers from './assets/games_offers.png';
import signupoffers from './assets/signup_offers.jpg';
import './home.css'; 

const Home = () => {

const storeinfo = localStorage.getItem('isVerified');  
const isLoggedIn = storeinfo === 'true';
const ref = useRef();
const { t } = useTranslation();
const navigate = useNavigate();

const Cuangreen = (text) => {
  const parts = text.split("$CUAN");
  return (
    <>
      {parts[0]}
      <strong style={{ color: "#28a745" }}>$CUAN</strong>
      {parts[1]}
    </>
  );
};
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
    title: t('task.play_title'),
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
    <div className={`container home_container mt-5 privacy ${!isLoggedIn ? 'animate-center-out' : ''}`}>
      <div className="jumbotron home_main bg-light">
        <h1 className="display-9"><strong>{t('home_header')}</strong></h1>
        <p className="lead" style={{textAlign: "center"}} >{t('homepage.main_home')} <WordSwitchertwo/></p>
        <hr className="my-4" />
        <p>{Cuangreen(t('homepage.signup_text'))}</p>
        <Link className="btn btn-primary btn-lg" onClick={(e) => HandlePageClick(e, '/signup', ref, navigate)}  role="button"  style={{alignItems: 'center'}}>{t('homepage.signup_button')}</Link>
      </div>
      <h2 className="mb-4" style={{textAlign: "center"}}>{t('homepage.tasks_title')}</h2>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Home;
