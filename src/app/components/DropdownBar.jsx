import { RiArrowDropDownLine } from "react-icons/ri";

export default function DropdownBar(props) {
  return (
    <>
      <div className="bg-white border-2 rounded-full h-12 flex items-center justify-between">
        <p className="pl-4">{props.text}</p>
        <RiArrowDropDownLine size={40} />
      </div>
    </>
  );
}
