import React from 'react';
import Banner from '../components/Banner';
import homedesk from '../assets/homedesk.jpg';
import homemob from '../assets/homemob.jpg';
import CurrentPeakDemand from '../components/CurrentPeakDemand';
import ElectricityDataGrid from '../components/GridView';
import { useNavigate } from 'react-router-dom';
import Weather from '../components/Weather';
const Home = () => {
    const navigate = useNavigate();

    const gotoFutureData = () => {
        navigate('/futuredata');
    }
    return (
        <div className='container'>
            <Banner imgdesk={homedesk} imgmob={homemob} />
            <CurrentPeakDemand bar={true} />
            <Weather />
            <ElectricityDataGrid />
        </div>
    )
}

export default Home
