import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function Home(){
const [authenticated, setauthenticated] = useState(null);
const navigate = useNavigate();
	useEffect(() => {
		const loggedInUser = localStorage.getItem("authenticated");
			if (loggedInUser) {

		setauthenticated(true);
		console.log(loggedInUser);
	}
	if (!authenticated) {
		console.log(authenticated)
	 navigate("/Login");
	}
	}, []);

		return (
			<div>
				<p>Welcome to your Dashboard</p>
			</div>
		);
	
}

export default Home