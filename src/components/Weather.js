import React from 'react'
import icon from '../assets/weathericons/thunderstorm.svg';
import WeatherChart from './WeatherChart';
import { WiHumidity } from "react-icons/wi";
import { TiWeatherCloudy } from "react-icons/ti";
import { FiWind } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";

const Weather = () => {
    return (
        <div className='sm:p-4'>
            <div className="Header my-[20px]">
                <div className="heading text-center text-[32px] font-bold text-[#0F1926]"> Today's Weather Overview</div>
            </div>
            <div className="z-0 w-full content_box p-2 bg-[#0F1926] rounded-md grid gap-4 grid-cols-10 items-center ">
                <div className='col-span-3 flex justify-center items-center'>
                    <div className="py-2 px-6 bg-[#AABFB9] bg-opacity-20 backdrop-blur rounded-md " style={{ boxShadow: '0px 0px 10px 1px rgba(242, 239, 223, 0.75)' }}>
                        <div className="flex gap-2 items-center ">
                            <div className="icon">
                                <img className="w-20" src={icon} alt="" />
                            </div>
                            <div className=" font-bold text-[60px] text-[#F2EFDF]">27°C</div>
                        </div>
                        <div className="info flex flex-col gap-2  text-[#F2EFDF]">
                            <div className="weekday flex gap-2 items-center"><CiCalendarDate className='text-[28px] text-[#BF7C41]' /> Weekday : Saturday</div>
                            <div className="humidity flex gap-2 items-center"><WiHumidity className='text-[28px] text-[#BF7C41]' /> Humidity : 95%</div>
                            <div className="weather  flex gap-2 items-center"><TiWeatherCloudy className='text-[28px] text-[#BF7C41]' />Weather : Fog</div>
                            <div className="windspeed  flex gap-2 items-center"><FiWind className='text-[28px] text-[#BF7C41]' /> Wind Speed : 7km/h</div>
                        </div>
                    </div>
                </div>
                <div className='col-span-7'>
                    <WeatherChart />
                </div>
            </div>
        </div>
    )
}

export default Weather
