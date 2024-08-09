import React from 'react';
import TaskList from '../components/TaskList';

const Tasks = () => {

  const storeinfo = localStorage.getItem('isVerified');
  const isLoggedIn = storeinfo === 'true';
  const tasks = [
    { id: 1, title: 'Survey Task', description: 'Complete a survey and earn $CUAN.', image: 'https://od.lk/s/NjFfODI4MTUwOTZf/person%20survey.jpeg' , href:[isLoggedIn ? "#/survey-tasks" : "#/signup"]},
    { id: 2, title: 'Play a Game', description: 'Play a square game and earn $CUAN.', image: 'https://od.lk/s/NjFfODUzMDU0ODdf/square%20image.jpg' , href: [isLoggedIn ? "#/mainpage" : "#/signup"]},
    { id: 3, title: 'Sign Up Offer', description: 'Sign up for services and earn $CUAN.', image: 'https://od.lk/s/NjFfODI4MTUwOTVf/people%20dollar.jpg', href:[isLoggedIn ? "#/cpalead" : "#/signup"]},
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Available Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Tasks;
