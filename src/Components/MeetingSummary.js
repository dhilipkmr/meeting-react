import React from 'react';

class MeetingSummary extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="tabs" className="tabs marginT20">
          <span className="padL10 d-inbl tab cursorPtr activeTab" id="allMeetingsTab">All Meetings</span>
          <span className="padL10 d-inbl tab cursorPtr" id="todayTab">Today's Meetings</span>
          <div id="meetingSummary" className="meetingSummary">
            <ul className="card d-inbl">
              <li>
                <div className="fb">Block A - Floor 1 - Meeting Room 1</div>
                <div className="padT10">
                  <span className="fb">Starts at:</span>
                  <span>Sun Jul 21 2030,</span>
                  <span>10:00</span>
                </div>
                <div className="padT10">
                  <span className="fb">Ends at:</span>
                  <span>Sun Jul 21 2030,</span>
                  <span>11:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MeetingSummary;
