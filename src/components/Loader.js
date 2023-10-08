import Placeholder from "react-bootstrap/Placeholder";

function Loader() {
  return (
    <>
      <div className="m-3">
        <Placeholder as="p" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      </div>
    </>
  );
}

export default Loader;
