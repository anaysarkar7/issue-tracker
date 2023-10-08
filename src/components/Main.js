import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Input from "./Input";
import Result from "./Result";

const Main = () => {
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [issues, setIssues] = useState([]);
  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [githubToken, setGithubToken] = useState("");

  const fetchData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/vnd.github+json");
    myHeaders.append("Authorization", "Bearer " + githubToken);
    myHeaders.append("X-GitHub-Api-Version", "2022-11-28");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
        requestOptions
      );
      const data = await res.json();
      setIssues(data);
      setIsLoading(false);
      setShowResults(true);
    } catch (e) {}
  };

  if (isLoading) return <Loader />;

  if (showResults && issues.length > 0)
    return <Result issues={issues} goBack={() => setShowResults(false)} />;

  return (
    <>
      <div className="m-3">
        <Input
          displayName={"Repository Owner"}
          value={repoOwner}
          setValue={setRepoOwner}
        />
        <Input
          displayName={"Repository Name"}
          value={repoName}
          setValue={setRepoName}
        />
        <Input
          displayName={"Github Token"}
          value={githubToken}
          setValue={setGithubToken}
        />
        <Button variant="primary" className="mt-2" onClick={fetchData}>
          Search
        </Button>
      </div>
    </>
  );
};

export default Main;
