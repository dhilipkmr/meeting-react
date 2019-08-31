import React from 'react';
import {getMicro} from '../Utils';

class SchedulerBox extends React.Component {

  handleError = (showError, errorText = 'Invalid Input!') => {
    if (showError) {
      this.refs.error.classList.remove('dn');
      this.refs.error.innerText = errorText;
      return;
    }
    this.refs.error.classList.add('dn');
  }

  checkIfMeetingRoomFree = (currentMeetingInfo) => {
    let isBooked = false;
    this.props.meetingsList.forEach((value) => {
      const isSameLocation = (currentMeetingInfo.buildingName === value.buildingName && currentMeetingInfo.floorNumber === value.floorNumber && currentMeetingInfo.meetingRoomName === value.meetingRoomName);
      const isSameTime = (currentMeetingInfo.startMicro >= value.startMicro && currentMeetingInfo.startMicro <= value.endMicro) || (currentMeetingInfo.endMicro >= value.startMicro && currentMeetingInfo.endMicro <= value.endMicro);
      if (isSameTime && isSameLocation) {
        isBooked = true;
      }
    });
    if (isBooked) {
      return 'The room is Unavailable';
    }
    return '';
  }

  resetInfo = function() {
    this.refs.buildingName.value = 'Block A';
    this.refs.floorNumber.value = 'Floor 1';
    this.refs.meetingRoomName.value = 'Meeting Room 1';
    this.refs.startDate.value = '';
    this.refs.startTime.value = '';
    this.refs.endDate.value = '';
    this.refs.endTime.value = '';
  }

  scheduleMeeting = () => {
    const buildingName = this.refs.buildingName.value;
    const floorNumber = this.refs.floorNumber.value;
    const meetingRoomName = this.refs.meetingRoomName.value;
    const startDate = this.refs.startDate.value;
    const startTime = this.refs.startTime.value;
    const endDate = this.refs.endDate.value;
    const endTime = this.refs.endTime.value;
    if (!buildingName || !floorNumber || !meetingRoomName || !startDate || !startTime || !endDate || !endTime) {
     this.handleError(true);
      return null;
    }
    this.handleError(false);
    const value = {
      startDate, startTime, endDate, endTime,
      startMicro: getMicro(startDate, startTime),
      endMicro: getMicro(endDate, endTime),
      buildingName, floorNumber, meetingRoomName
    };
    const errorText = this.checkIfMeetingRoomFree(value);
    if (errorText) {
      this.handleError(true, errorText);
      return null;
    }
    this.props.addNewMeeting(value);
    this.resetInfo();
  }

  render() {
    return (
      <React.Fragment>
        <div className="margin20 textCenter fs20">Meeting Scheduler</div>
        <div className="textCenter inputContent">
          <div className="txtLeft marginTB40 fb">
            <label className="" htmlFor="buildingName">Block Name: </label>
            <select ref="buildingName">
              <option value="Block A"  selected="selected">Block A</option>
              <option value="Block B">Block B</option>
              <option value="Block C">Block C</option>
            </select>
            <label className="padL10" htmlFor="floorNumber">Floor No:</label>
            <select ref="floorNumber">
              <option value="Floor 1"  selected="selected">Floor 1</option>
              <option value="Floor 2">Floor 2</option>
              <option value="Floor 3">Floor 3</option>
            </select>
            <label className="padL10" htmlFor="meetingRoomName">Meeting Room No:</label>
            <select ref="meetingRoomName">
              <option value="Meeting Room 1">Room 1</option>
              <option value="Meeting Room 2">Room 2</option>
              <option value="Meeting Room 3">Room 3</option>
            </select>
          </div>
          <div className="txtLeft">
            <div className="marginTB40 fb">Meeting Start at :
              <input type="date" ref="startDate" />
              <input type="time" ref="startTime" />
            </div>
            <div className="marginTB40 fb">Meeting Ends at :
              <input type="date" ref="endDate"/>
              <input type="time" ref="endTime"/>
            </div>
          </div>
          <div ref="error" className="dn error padB10">Invalid Input!</div>
          <button type="button" className="marginB20 btn" onClick={this.scheduleMeeting}>Schedule Meeting</button>
        </div>
      </React.Fragment>
    );
  }
}

export default SchedulerBox;
