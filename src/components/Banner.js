import React from 'react'

const Banner = ({ imgmob, imgdesk }) => {
    return (
        <div className='p-4 '>
            <picture >
                <source className="rounded-3xl " media="(max-width:700px)" srcSet={imgmob} style={{ boxShadow: '0px 0px 10px 1px rgba(40, 56, 69, 0.75)' }} />
                <img className="rounded-3xl" src={imgdesk} alt="Flowers" style={{ boxShadow: '0px 0px 10px 1px rgba(40, 56, 69, 0.75)' }} />
            </picture>
        </div>
    )
}

export default Banner
