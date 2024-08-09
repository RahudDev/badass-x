import React from 'react';
import TaskList from '../components/TaskList';
import WordSwitcher from './wordswitcher';

const Home = () => {

const storeinfo = localStorage.getItem('isVerified');  
const isLoggedIn = storeinfo === 'true';
  const tasks = [
    { id: 1, title: 'Survey Task', description: 'Complete a survey and earn $CUAN.', image: 'https://od.lk/s/NjFfODI4MTUwOTZf/person%20survey.jpeg', href:[isLoggedIn ? "#/survey-tasks" : "#/signup"]},
    { id: 2, title: 'Play a Game', description: 'Play Square game and earn $CUAN.', image: 'https://od.lk/s/NjFfODUzMDU0ODdf/square%20image.jpg', href:[isLoggedIn ? "#/mainpage" : "#/signup"]},
    { id: 3, title: 'Sign Up Offer', description: 'Sign up for services and earn $CUAN.', image: 'https://od.lk/s/NjFfODI4MTUwOTVf/people%20dollar.jpg', href:[isLoggedIn ? "https://fastsvr.com/list/1724" : "#/signup"]},
  ];

  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light">
        <h1 className="display-4">Welcome to Free Cuan</h1>
        <p className="lead">Earn rewards by completing simple <WordSwitcher/></p>
        <hr className="my-4" />
        <p>Sign up now and start earning $CUAN.</p>
        <a className="btn btn-primary btn-lg" href="#/SignUp" role="button">Sign Up</a>
      </div>
      <h2 className="mb-4">Available Tasks</h2>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Home;
