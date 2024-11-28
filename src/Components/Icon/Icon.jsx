import { FaPen, FaRegCircle, FaTimes } from "react-icons/fa"; // Importing "Font-Aweasom-Icon(fa)" from the "react-icon".

function Icon({ name }) {
    if (name === "circle") {
        return(
            <FaRegCircle/> // returning "circle".
        )
    } else if(name === "cross"){
        return(
            <FaTimes/> // returning "cross".
        )
    }else{
        return(
            <FaPen/> // returning "pen".
        )
    }
}

export default Icon;
