/// <reference types="Cypress" />

context('Meeting Scheduler Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.server();
    cy.get('[data-cy="blockSelector"]').as('blockSelector');
    cy.get('[data-cy="floorSelector"]').as('floorSelector');
    cy.get('[data-cy="roomSelector"]').as('roomSelector');
    cy.get('[data-cy="startDate"]').as('startDate');
    cy.get('[data-cy="startTime"]').as('startTime');
    cy.get('[data-cy="endDate"]').as('endDate');
    cy.get('[data-cy="endTime"]').as('endTime');
    cy.get('[data-cy="scheduleBtn"]').as('scheduleBtn');

    // Entering Data
    const dateToUse = new Date(new Date().setDate(new Date().getDate() + 1));
    cy.wrap(dateToUse).as('dateToUse');
    const year = dateToUse.getFullYear();
    let month = dateToUse.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = dateToUse.getDate();
    day = day < 10 ? ('0' + day) : day;

    cy.get('@blockSelector').select('Block B').should('have.value', 'Block B');
    cy.get('@floorSelector').select('Floor 2').should('have.value', 'Floor 2');
    cy.get('@roomSelector').select('Room 2').should('have.value', 'Meeting Room 2');
    cy.get('@startDate').type(year + '-' + month + '-' + day);
    cy.get('@startTime').type('13:00');
    cy.get('@endDate').type(year + '-' + month + '-' + day);
    cy.get('@endTime').type('14:00');
    cy.get('@scheduleBtn').click();
  });

  it('Should add Meeting under All meetings tab', () => {
    cy.get('[data-cy="allMeetingsTab"]').should('have.class', 'activeTab');
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]').then(($headings) => {
      expect($headings[0].innerText).to.contain('Block B');
      expect($headings[0].innerText).to.contain('Floor 2');
      expect($headings[0].innerText).to.contain('Meeting Room 2');
    });
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]').then(($startDates) => {
      let dateToUse = new Date(new Date().setDate(new Date().getDate() + 1));
      dateToUse = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), dateToUse.getDate(), 13);
      expect($startDates[0].innerText).to.contain(dateToUse.getFullYear());
      expect($startDates[0].innerText).to.contain(dateToUse.getDate());
      expect($startDates[0].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][dateToUse.getMonth()]);
      expect($startDates[0].innerText).to.contain('13:00');
    });
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]').then(($endDates) => {
      let dateToUse = new Date(new Date().setDate(new Date().getDate() + 1));
      dateToUse = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), dateToUse.getDate(), 14);
      expect($endDates[0].innerText).to.contain(dateToUse.getFullYear());
      expect($endDates[0].innerText).to.contain(dateToUse.getDate());
      expect($endDates[0].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][dateToUse.getMonth()]);
      expect($endDates[0].innerText).to.contain('14:00');
    })
  });
  it('Should reset values after successful addition', () => {
    cy.get('@blockSelector').should('have.value', 'Block A');
    cy.get('@floorSelector').should('have.value', 'Floor 1');
    cy.get('@roomSelector').should('have.value', 'Meeting Room 1');
    cy.get('@startDate').should('have.value', '')
    cy.get('@startTime').should('have.value', '')
    cy.get('@endDate').should('have.value', '')
    cy.get('@endTime').should('have.value', '')
  });

  it('should add content to All meetings tab in sorted order', () => {
    cy.get('[data-cy="allMeetingsTab"]').should('have.class', 'activeTab');
    const dateToUse = new Date();
    cy.wrap(dateToUse).as('dateToUse');
    const year = dateToUse.getFullYear();
    let month = dateToUse.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = dateToUse.getDate();
    day = day < 10 ? ('0' + day) : day;
  
    cy.get('@blockSelector').select('Block B').should('have.value', 'Block B');
    cy.get('@floorSelector').select('Floor 2').should('have.value', 'Floor 2');
    cy.get('@roomSelector').select('Room 2').should('have.value', 'Meeting Room 2');
    cy.get('@startDate').type(year + '-' + month + '-' + day);
    cy.get('@startTime').type('23:58');
    cy.get('@endDate').type(year + '-' + month + '-' + day);
    cy.get('@endTime').type('23:59');
    cy.get('@scheduleBtn').click();

    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]').then(($headings) => {
      expect($headings[0].innerText).to.contain('Block B');
      expect($headings[0].innerText).to.contain('Block B');
      expect($headings[0].innerText).to.contain('Floor 2');
      expect($headings[0].innerText).to.contain('Floor 2');
      expect($headings[0].innerText).to.contain('Meeting Room 2');
      expect($headings[0].innerText).to.contain('Meeting Room 2');
    });

    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]').then(($startDates) => {
      let date = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), dateToUse.getDate(), 23, 58);
      expect($startDates[0].innerText).to.contain(date.getFullYear());
      expect($startDates[0].innerText).to.contain(date.getDate());
      expect($startDates[0].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
      expect($startDates[0].innerText).to.contain('23:58');

      date = new Date(new Date().setDate(new Date().getDate() + 1));
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13);
      expect($startDates[1].innerText).to.contain(date.getFullYear());
      expect($startDates[1].innerText).to.contain(date.getDate());
      expect($startDates[1].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
      expect($startDates[1].innerText).to.contain('13:00');

    });
    
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]').then(($endDates) => {
      let date = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), dateToUse.getDate(), 23, 59);
      expect($endDates[0].innerText).to.contain(date.getFullYear());
      expect($endDates[0].innerText).to.contain(date.getDate());
      expect($endDates[0].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
      expect($endDates[0].innerText).to.contain('23:59');

      date = new Date(new Date().setDate(new Date().getDate() + 1));
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14);
      expect($endDates[1].innerText).to.contain(date.getFullYear());
      expect($endDates[1].innerText).to.contain(date.getDate());
      expect($endDates[1].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
      expect($endDates[1].innerText).to.contain('14:00');
    });
  });
  
  it('Should add Meeting under All meetings tab', () => {
    cy.get('[data-cy="allMeetingsTab"]').should('have.class', 'activeTab');
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]').then(($headings) => {
      expect($headings[0].innerText).to.contain('Block B');
      expect($headings[0].innerText).to.contain('Floor 2');
      expect($headings[0].innerText).to.contain('Meeting Room 2');
    });
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]').then(($startDates) => {
      let dateToUse = new Date(new Date().setDate(new Date().getDate() + 1));
      dateToUse = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), dateToUse.getDate(), 13);
      expect($startDates[0].innerText).to.contain(dateToUse.getFullYear());
      expect($startDates[0].innerText).to.contain(dateToUse.getDate());
      expect($startDates[0].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][dateToUse.getMonth()]);
      expect($startDates[0].innerText).to.contain('13:00');
    });
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]').then(($endDates) => {
      let dateToUse = new Date(new Date().setDate(new Date().getDate() + 1));
      dateToUse = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), dateToUse.getDate(), 14);
      expect($endDates[0].innerText).to.contain(dateToUse.getFullYear());
      expect($endDates[0].innerText).to.contain(dateToUse.getDate());
      expect($endDates[0].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][dateToUse.getMonth()]);
      expect($endDates[0].innerText).to.contain('14:00');
    })
  });
  it('Should reset values after successful addition', () => {
    cy.get('@blockSelector').should('have.value', 'Block A');
    cy.get('@floorSelector').should('have.value', 'Floor 1');
    cy.get('@roomSelector').should('have.value', 'Meeting Room 1');
    cy.get('@startDate').should('have.value', '')
    cy.get('@startTime').should('have.value', '')
    cy.get('@endDate').should('have.value', '')
    cy.get('@endTime').should('have.value', '')
  });

  it('should show only today\'s meeting in Today\'s Meeting Tab', () => {
    cy.get('[data-cy="todayMeetingsTab"]').click();
    cy.get('[data-cy="todayMeetingsTab"]').should('have.class', 'activeTab');
    const dateToUse = new Date();
    cy.wrap(dateToUse).as('dateToUse');
    const year = dateToUse.getFullYear();
    let month = dateToUse.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = dateToUse.getDate();
    day = day < 10 ? ('0' + day) : day;
  
    cy.get('@blockSelector').select('Block B').should('have.value', 'Block B');
    cy.get('@floorSelector').select('Floor 2').should('have.value', 'Floor 2');
    cy.get('@roomSelector').select('Room 2').should('have.value', 'Meeting Room 2');
    cy.get('@startDate').type(year + '-' + month + '-' + day);
    cy.get('@startTime').type('23:58');
    cy.get('@endDate').type(year + '-' + month + '-' + day);
    cy.get('@endTime').type('23:59');
    cy.get('@scheduleBtn').click();

    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]').then(($headings) => {
      expect($headings[0].innerText).to.contain('Block B');
      expect($headings[0].innerText).to.contain('Floor 2');
      expect($headings[0].innerText).to.contain('Meeting Room 2');
    });

    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]').then(($startDates) => {
      let date = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), dateToUse.getDate(), 23, 58);
      expect($startDates[0].innerText).to.contain(date.getFullYear());
      expect($startDates[0].innerText).to.contain(date.getDate());
      expect($startDates[0].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
      expect($startDates[0].innerText).to.contain('23:58');
    });
    
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]').then(($endDates) => {
      let date = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), dateToUse.getDate(), 23, 59);
      expect($endDates[0].innerText).to.contain(date.getFullYear());
      expect($endDates[0].innerText).to.contain(date.getDate());
      expect($endDates[0].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
      expect($endDates[0].innerText).to.contain('23:59');
    });
  });

  it('should add content to All meetings tab in sorted order', () => {
    cy.get('[data-cy="todayMeetingsTab"]').click();
    const dateToUse = new Date();
    cy.wrap(dateToUse).as('dateToUse');
    const year = dateToUse.getFullYear();
    let month = dateToUse.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = dateToUse.getDate();
    day = day < 10 ? ('0' + day) : day;
  
    cy.get('@blockSelector').select('Block B').should('have.value', 'Block B');
    cy.get('@floorSelector').select('Floor 2').should('have.value', 'Floor 2');
    cy.get('@roomSelector').select('Room 2').should('have.value', 'Meeting Room 2');
    cy.get('@startDate').type(year + '-' + month + '-' + day);
    cy.get('@startTime').type('23:58');
    cy.get('@endDate').type(year + '-' + month + '-' + day);
    cy.get('@endTime').type('23:59');
    cy.get('@scheduleBtn').click();
  
    cy.get('@blockSelector').select('Block B').should('have.value', 'Block B');
    cy.get('@floorSelector').select('Floor 2').should('have.value', 'Floor 2');
    cy.get('@roomSelector').select('Room 2').should('have.value', 'Meeting Room 2');
    cy.get('@startDate').type(year + '-' + month + '-' + day);
    cy.get('@startTime').type('23:56');
    cy.get('@endDate').type(year + '-' + month + '-' + day);
    cy.get('@endTime').type('23:57');
    cy.get('@scheduleBtn').click();

    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]').then(($headings) => {
      expect($headings[0].innerText).to.contain('Block B');
      expect($headings[0].innerText).to.contain('Block B');
      expect($headings[0].innerText).to.contain('Floor 2');
      expect($headings[0].innerText).to.contain('Floor 2');
      expect($headings[0].innerText).to.contain('Meeting Room 2');
      expect($headings[0].innerText).to.contain('Meeting Room 2');
    });

    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]').then(($startDates) => {
      let date = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), dateToUse.getDate(), 23, 56);
      expect($startDates[0].innerText).to.contain(date.getFullYear());
      expect($startDates[0].innerText).to.contain(date.getDate());
      expect($startDates[0].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
      expect($startDates[0].innerText).to.contain('23:56');

      date = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), dateToUse.getDate(), 23, 58);
      expect($startDates[1].innerText).to.contain(date.getFullYear());
      expect($startDates[1].innerText).to.contain(date.getDate());
      expect($startDates[1].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
      expect($startDates[1].innerText).to.contain('23:58');

    });
    
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]').then(($endDates) => {
      let date = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), dateToUse.getDate(), 23, 57);
      expect($endDates[0].innerText).to.contain(date.getFullYear());
      expect($endDates[0].innerText).to.contain(date.getDate());
      expect($endDates[0].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
      expect($endDates[0].innerText).to.contain('23:57');

      date = new Date(dateToUse.getFullYear(), dateToUse.getMonth(), dateToUse.getDate(), 23, 59);
      expect($endDates[1].innerText).to.contain(date.getFullYear());
      expect($endDates[1].innerText).to.contain(date.getDate());
      expect($endDates[1].innerText.toLowerCase()).to.contain(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
      expect($endDates[1].innerText).to.contain('23:59');
    });
  });

  it('should not add a meeting if the room is pre booked', () => {
    const dateToUse = new Date(new Date().setDate(new Date().getDate() + 1));
    cy.wrap(dateToUse).as('dateToUse');
    const year = dateToUse.getFullYear();
    let month = dateToUse.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = dateToUse.getDate();
    day = day < 10 ? ('0' + day) : day;

    cy.get('@blockSelector').select('Block B').should('have.value', 'Block B');
    cy.get('@floorSelector').select('Floor 2').should('have.value', 'Floor 2');
    cy.get('@roomSelector').select('Room 2').should('have.value', 'Meeting Room 2');
    cy.get('@startDate').type(year + '-' + month + '-' + day);
    cy.get('@startTime').type('13:00');
    cy.get('@endDate').type(year + '-' + month + '-' + day);
    cy.get('@endTime').type('14:00');
    cy.get('@scheduleBtn').click();
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]').then(($headings) => {
      expect($headings.length).to.be.eq(1);
    });
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]').then(($startDates) => {
      expect($startDates.length).to.be.eq(1);
    });
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]').then(($endDates) => {
      expect($endDates.length).to.be.eq(1);
    })
  });

  it('should show error message while trying to book pre-booked room', () => {
    const dateToUse = new Date(new Date().setDate(new Date().getDate() + 1));
    cy.wrap(dateToUse).as('dateToUse');
    const year = dateToUse.getFullYear();
    let month = dateToUse.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = dateToUse.getDate();
    day = day < 10 ? ('0' + day) : day;

    cy.get('@blockSelector').select('Block B').should('have.value', 'Block B');
    cy.get('@floorSelector').select('Floor 2').should('have.value', 'Floor 2');
    cy.get('@roomSelector').select('Room 2').should('have.value', 'Meeting Room 2');
    cy.get('@startDate').type(year + '-' + month + '-' + day);
    cy.get('@startTime').type('13:00');
    cy.get('@endDate').type(year + '-' + month + '-' + day);
    cy.get('@endTime').type('14:00');
    cy.get('@scheduleBtn').click();
    cy.get('[data-cy="error"]').then(($err) => {
      expect($err[0].innerText).to.contain('The room is Unavailable');
    });
  });

  it('should show error message while trying to book in past', () => {
    const dateToUse = new Date(new Date().setDate(new Date().getDate() - 1));
    cy.wrap(dateToUse).as('dateToUse');
    const year = dateToUse.getFullYear();
    let month = dateToUse.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = dateToUse.getDate();
    day = day < 10 ? ('0' + day) : day;

    cy.get('@blockSelector').select('Block B').should('have.value', 'Block B');
    cy.get('@floorSelector').select('Floor 2').should('have.value', 'Floor 2');
    cy.get('@roomSelector').select('Room 2').should('have.value', 'Meeting Room 2');
    cy.get('@startDate').type(year + '-' + month + '-' + day);
    cy.get('@startTime').type('13:00');
    cy.get('@endDate').type(year + '-' + month + '-' + day);
    cy.get('@endTime').type('14:00');
    cy.get('@scheduleBtn').click();
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]').then(($headings) => {
      expect($headings.length).to.be.eq(1);
    });
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]').then(($startDates) => {
      expect($startDates.length).to.be.eq(1);
    });
    cy.get('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]').then(($endDates) => {
      expect($endDates.length).to.be.eq(1);
    });
    cy.get('[dat-cy="error"]').then(($err) => {
      expect($err[0].innerText.toLowerCase()).to.contain('cannot schedule meeting in the past');
    });
  });
});

