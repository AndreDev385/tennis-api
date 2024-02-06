import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export function Loading() {
    return (
        <FontAwesomeIcon
            className="center mt-5"
            size="2xl"
            icon={faCircleNotch}
            spin
        />
    );
}
