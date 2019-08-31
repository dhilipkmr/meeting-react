import React from 'react';
import MeetingSummary from './MeetingSummary';
import SchedulerBox from './SchedulerBox';

class MeetingScheduler extends React.Component {
  componentDidMount() {
    // This should be the first item in the meetings summary.
    // Any new addition to `meetingsList` should be added after placed after this. 
    window.meetingsList = [
      {
        startDate: "2030-07-21",
        startTime: "10:00",
        endDate: "2030-07-21",
        endTime: "11:00",
        buildingName: "Block A",
        floorNumber: "Floor 1",
        meetingRoomName: "Meeting Room 1"
      }
    ];
  }

  render() {
    return (
      <div className="textCenter">
        <SchedulerBox/>
        <MeetingSummary/>
      </div>
    );
  }
}
export default MeetingScheduler;
