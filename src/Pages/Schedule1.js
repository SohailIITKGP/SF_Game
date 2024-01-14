import React from 'react';
import '../styles/Schedule1.css';

const Schedule1 = () => {

    const tabs = [
      { id: 'tab-1', time: '8am - 10am', title: 'Jamie talks design', schedule: 'Monday - Thursday', description: 'I talk a bunch of rubbish', icon: 'ion-android-color-palette' },
      { id: 'tab-2', time: '10am - 12am', title: 'Arctic Monkeys Live', schedule: 'Monday - Wednesday', description: 'Music for your lug holes', icon: 'ion-music-note' },
      { id: 'tab-3', time: '12am - 4pm', title: 'Steven Fry podcast', schedule: 'Saturday - Sunday', description: 'Steven Fry says words', icon: 'ion-android-microphone' },
      { id: 'tab-4', time: '4pm - 8pm', title: 'Massive event', schedule: 'Monday - Friday', description: 'Some kind of music festival', icon: 'ion-android-bar' },
    ];

    return (

<div className="right">
<div className="Timetable">
  <div  className="Timetable_inner">
    {tabs.map(tab => (
      <React.Fragment key={tab.id}>
        <input type="radio" id={tab.id} name="buttons" defaultChecked={tab.id === 'tab-1'} />
        <label htmlFor={tab.id}>
          <div className="Timetable_inner__tab">
            <h2>
              <i className={`icon ion-android-alarm-clock`}></i>
              {tab.time}
            </h2>
            <div className="tab_left">
              <i className={`big icon ${tab.icon}`}></i>
              <div className="tab_left__image">
                <i className={`icon ${tab.icon}`}></i>
              </div>
            </div>
            <div className="tab_right">
              <h3>{tab.title}</h3>
              <h4>{tab.schedule}</h4>
              <p>{tab.description}</p>
              <button>More information</button>
            </div>
          </div>
        </label>
      </React.Fragment>
    ))}
  </div>
</div>
</div>

        );
    };
    
export default Schedule1;