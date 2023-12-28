import "../assets/css/chat.css";
import { Link } from "react-router-dom";
const FilesLibraryListItem = ({ item }) => {
  function formatString(inputString) {
    if (inputString.length <= 15) {
      // If the string is 10 characters or less, return it as is
      return inputString;
    } else {
      // Take the first 5 characters and the last 5 characters
      const first5 = inputString.substring(0, 5);
      const last5 = inputString.substring(inputString.length - 10);

      // Combine them with the ellipsis in between
      return first5 + "..." + last5;
    }
  }

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={item.uploaded_file}
      target="_blank"
      className={"cc-rht-item"}
    >
      <div className="cc-rht-item-title">{formatString(item.file_name)}</div>
      <div className="cc-rht-item-desc">{item?.type}</div>
    </Link>
  );
};

export default FilesLibraryListItem;
