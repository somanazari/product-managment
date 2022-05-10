const Wrapper = (WrappedComponent, className) => {
  // HOC return the Method
  return (props) => {
    //   return the JSX in here
    return (
      <div className={className}>
        {/* pass all props to exported Components */}
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default Wrapper;
