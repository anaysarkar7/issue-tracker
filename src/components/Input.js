import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Input = ({ displayName, value, setValue }) => {
  return (
    <InputGroup size="lg" className="m-1">
      <InputGroup.Text id="inputGroup-sizing-lg">{displayName}</InputGroup.Text>
      <Form.Control
        id="repo-link"
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </InputGroup>
  );
};

export default Input;
