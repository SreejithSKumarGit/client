
import './App.css';
import { Home } from './Pages/Home Page/Home';
import {Route,Routes} from "react-router-dom";
import { JobLists } from './Pages/JobLists Page/JobLists';
import { JobDetails } from './Pages/JobDetails Page/JobDetails';




function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/jobs' element={<JobLists/>}/>
      <Route path='/jobDetails/:_id' element={<JobDetails/>}/>
    </Routes>
  );
}

export default App;

