import React from 'react';

class SchedulerBox extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="margin20 textCenter fs20">Meeting Scheduler</div>
        <div className="textCenter inputContent">
          <div className="txtLeft marginTB40 fb">
            <label className="" htmlFor="buildingName">Block Name: </label>
            <select id="buildingName">
              <option value="Block A"  selected="selected">Block A</option>
              <option value="Block B">Block B</option>
              <option value="Block C">Block C</option>
            </select>
            <label className="padL10" htmlFor="floorNumber">Floor No:</label>
            <select id="floorNumber">
              <option value="Floor 1"  selected="selected">Floor 1</option>
              <option value="Floor 2">Floor 2</option>
              <option value="Floor 3">Floor 3</option>
            </select>
            <label className="padL10" htmlFor="meetingRoomName">Meeting Room No:</label>
            <select id="meetingRoomName">
              <option value="Meeting Room 1">Room 1</option>
              <option value="Meeting Room 2">Room 2</option>
              <option value="Meeting Room 3">Room 3</option>
            </select>
          </div>
          <div className="txtLeft">
            <div className="marginTB40 fb">Meeting Start at :
              <input type="date" id="startDate" value=""/>
              <input type="time" id="startTime" value="00:00"/>
            </div>
            <div className="marginTB40 fb">Meeting Ends at :
              <input type="date" id="endDate" value=""/>
              <input type="time" id="endTime" value="00:00"/>
            </div>
          </div>
          <div id="error" className="dn error padB10">Invalid Input!</div>
          <button type="button" className="marginB20 btn" id="scheduleBtn">Schedule Meeting</button>
        </div>
      </React.Fragment>
    );
  }
}

export default SchedulerBox;
