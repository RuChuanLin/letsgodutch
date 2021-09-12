
const First = (props) => {
  console.log(props);
  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };

  return (
    <div>
      <h3 className="text-center">Welcome! Have a look around!</h3>

      <label>First Name</label>
      <input
        type="text"
        className="form-control"
        name="firstname"
        placeholder="First Name"
        onChange={update}
      />
      {/* <WizardPanel {...props} /> */}
    </div>
  );
};

export default First;
