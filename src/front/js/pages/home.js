import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { Cards } from "../component/Cards"

export const Home = () => {

	useEffect(() => {
		getEvents()
	}, [state])

	const { state, getEvents } = useContext(Context)

	return (
		<div className="text-center mt-5">
			<Cards />
		</div>
	);
};
