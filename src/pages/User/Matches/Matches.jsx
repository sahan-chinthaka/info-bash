import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FS } from "../../../firebase.init";
import "./Matches.scss";
import MatchView from "./MatchView";

function Matches() {
	const [matches, setMatches] = useState([]);

	useEffect(() => {
		const mc = collection(FS, "matches");

		getDocs(query(mc, orderBy("order"))).then((snap) => {
			setMatches(snap.docs.map((i) => ({ ...i.data(), id: i.id })));
		});
	}, []);
	return (
		<div className="user-matches">
			{matches.map((i) => (
				<MatchView key={i.id} data={i} />
			))}
		</div>
	);
}

export default Matches;
