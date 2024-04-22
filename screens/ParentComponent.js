import React, { useState } from 'react';
import { Form } from './Form';

const ParentComponent = () => {
  const [attendees, setAttendees] = useState([]);

  const handleAddAttendee = (newAttendee) => {
    setAttendees([...attendees, newAttendee]);
  };

  return (
    <Form onAddAttendee={handleAddAttendee} />
  );
};

export default ParentComponent;
