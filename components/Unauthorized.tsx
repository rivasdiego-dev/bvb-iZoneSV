
import { useRouter } from "next/navigation";

export default function Unauthorized() {
    const router = useRouter();
    const userID = localStorage.getItem("id");
    let userIsLogged = false;

    if (userID !== null && userID !== undefined) userIsLogged = true;

    let message = userIsLogged ? "Go Back" : "Log In";

    const goBackHandler = () => {
        router.replace("/");
    };

    const loginHandler = () => {
        localStorage.removeItem("id");
        router.replace("/login");
    };

    return (
        <div>
            <div>401</div>
            <div>Unauthorized</div>
            <button
                onClick={userIsLogged ? goBackHandler : loginHandler}
                className="btn-primary m-2"
            >
                {" "}
                {message}
            </button>
        </div>
    );
}