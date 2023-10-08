import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { NavLink, Stack } from "react-bootstrap";
import { Dropdown } from "bootstrap";

const Result = ({ issues, goBack }) => {
  const [weeklyClosureRate, setWeeklyClosureRate] = useState();
  const [weeklyIssueCount, setWeeklyIssueCount] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const calculateResults = () => {
    let weeklyIssueCount = 0;
    let weeklyClosedIssues = 0;
    let weeklyOpenIssues = 0;

    const currentDate = new Date();
    const startOfWeek = new Date();
    startOfWeek.setUTCDate(currentDate.getUTCDate() - 7);
    issues.forEach((issue) => {
      const createdAt = new Date(issue.created_at);
      if (createdAt >= startOfWeek && createdAt <= currentDate) {
        weeklyIssueCount++;
        if (issue.state === "closed") {
          weeklyClosedIssues++;
        } else {
          weeklyOpenIssues++;
        }
      }
    });

    setWeeklyIssueCount(weeklyIssueCount);
    setWeeklyClosureRate((weeklyClosedIssues / weeklyOpenIssues) * 100);
  };

  useEffect(() => {
    calculateResults();
  }, []);

  return (
    <>
      <div className="m-3">
        <ListGroup as="ul">
          <ListGroup.Item as="li" active>
            Results
          </ListGroup.Item>
          <ListGroup.Item as="li">
            Total Number of Issues: {issues.length}
          </ListGroup.Item>
          <ListGroup.Item as="li">
            Weekly Issue Count: {weeklyIssueCount}
          </ListGroup.Item>
          <ListGroup.Item as="li">
            Weekly Closure Rate: {weeklyClosureRate}%
          </ListGroup.Item>
        </ListGroup>
        <Button variant="primary" className="mt-3" onClick={showModal}>
          Show Issues
        </Button>
        <Modal show={isModalVisible} onHide={hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Issues</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {issues
              .sort((issue1, issue2) => {
                const d1 = new Date(issue1.created_at);
                const d2 = new Date(issue2.created_at);
                return d1 - d2;
              })
              .map((issue, i) => {
                return (
                  <>
                    <div className="h5">
                      {i + 1}. {issue.title}
                    </div>
                    <span className="">
                      <NavLink href={issue.html_url}>issue link</NavLink>
                    </span>
                  </>
                );
              })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Button variant="secondary" onClick={goBack} className="m-3">
        Back
      </Button>
    </>
  );
};

export default Result;
