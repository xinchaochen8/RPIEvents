import "./tagSelect.css";
import TAGS from "../../eventTags";
import CustomCheckbox from "./CustomCheckbox";

function TagSelect({setSelectedTags}) {
  const handleChange = (label) => {
    setSelectedTags(prevTags => {
      return {
        ...prevTags,
        [label]: !prevTags[label]
      };
    });
  }

  let inputs = TAGS.map((tag) => {
    return (
      <CustomCheckbox key={tag} label={tag} handleChange={handleChange} />
    );
  });

  return (
    <div id="tags-container" className={"d-grid"}>
      {inputs}
    </div>
  );
}

export default TagSelect;