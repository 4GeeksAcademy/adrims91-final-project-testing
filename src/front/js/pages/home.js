import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { Cards } from "../component/Cards"

export const Home = () => {
	const { state, getEvents } = useContext(Context)
	useEffect(() => {
		getEvents()
	}, [state.events.title])



	return (
		<div className="text-center mt-5">
			<Cards />
		</div>
	);
};
