import React from 'react';
import {isToday} from '../Utils';
class MeetingSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

  changeTab = (activeTab = 0) => {
    this.setState({activeTab})
  }

  getTabSpecificMeetingsList = () => {
    const {meetingsList} = this.props;
    const {activeTab} = this.state;
    const meetings = [];
    meetingsList.forEach((meeting) => {
      if (activeTab === 0 || (isToday(meeting.startMicro))) {
        meetings.push(meeting);
      }
    });
    return meetings;
  }

  render() {
    const {activeTab} = this.state;
    const meetings= this.getTabSpecificMeetingsList();
    return (
      <React.Fragment>
        <div id="tabs" className="tabs marginT20">
          <span className={'padL10 d-inbl tab cursorPtr ' + ( activeTab === 0 ? 'activeTab' : '')} onClick={this.changeTab.bind(this, 0)}>All Meetings</span>
          <span className={'padL10 d-inbl tab cursorPtr ' + ( activeTab === 1 ? 'activeTab' : '')} onClick={this.changeTab.bind(this, 1)}>Today's Meetings</span>
          <div id="meetingSummary" className="meetingSummary">
            { meetings.map((meetingItem, index) => {
              const {startDate, startTime, endTime, endDate, buildingName, floorNumber, meetingRoomName} = meetingItem;
              return (
                <ul className="card d-inbl">
                  <li key={index}>
                    <div className="fb">{buildingName + ' _ ' + floorNumber + ' - ' + meetingRoomName}</div>
                    <div className="padT10">
                      <span className="fb">Starts at:</span>
                      <span>{new Date(startDate).toDateString() + ', '}</span>
                      <span>{startTime}</span>
                    </div>
                    <div className="padT10">
                      <span className="fb">Ends at:</span>
                      <span>{new Date(endDate).toDateString() + ', '}</span>
                      <span>{endTime}</span>
                    </div>
                  </li>
                </ul>
              )
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MeetingSummary;
