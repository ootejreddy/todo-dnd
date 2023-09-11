import { useMemo } from "react";

const InputComponent = ({ inputValue, setInput }) => {
  const memoizedComponent = useMemo(() => {
    return (
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={`font-semibold  border-none  text-black outline-none bg-blue-300`}
        />
      </div>
    );
  }, [inputValue]); // Re-render the component only when inputValue changes

  // Function to handle input value change
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return memoizedComponent;
};

export default InputComponent;
