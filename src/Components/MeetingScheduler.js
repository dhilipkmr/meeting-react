import React from 'react';
import MeetingSummary from './MeetingSummary';
import SchedulerBox from './SchedulerBox';
import {getMicro} from '../Utils';

class MeetingScheduler extends React.Component {
  constructor(props) {
    super(props);
    // This should be the first item in the meetings summary.
    // Any new addition to `meetingsList` should be added after placed after this. 
    this.meetingsList = [
      {
        startDate: "2030-07-21",
        startTime: "10:00",
        endDate: "2030-07-21",
        endTime: "11:00",
        buildingName: "Block A",
        floorNumber: "Floor 1",
        meetingRoomName: "Meeting Room 1",
        startMicro: getMicro('2030-07-21', '10:00'),
        endMicro: getMicro('2030-07-21', '11:00')
      }
    ];
    this.state = {
      meetingsList: this.meetingsList
    }
  }

  updateMeetingsList = (mewMeeting) => {
    this.setState({
      meetingsList: [...this.state.meetingsList, mewMeeting]
    })
  }

  render() {
    const {meetingsList = []} = this.state;
    return (
      <div className="textCenter">
        <SchedulerBox addNewMeeting={this.updateMeetingsList} meetingsList={meetingsList}/>
        <MeetingSummary meetingsList={meetingsList}/>
      </div>
    );
  }
}
export default MeetingScheduler;
