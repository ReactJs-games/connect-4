import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Row from './Row';
import { useState } from 'react';

export default function App() {
	const [ board, setBoard ] = useState(Array(42).fill(""))
	const [ turn, setTurn ] = useState("blue")
	const handleClick = (e) => {
		const tile = e.target.querySelector('input').value
		const position = getLowestPlace(tile)
		let _board = [ ...board ]
		if(position !== false) {
			_board[position] = turn === "blue" ? "blue" : "red"
			setBoard(_board)
			setTurn(_turn => turn === "blue" ? "red" : "blue")
		}
	}
	const getLowestPlace = (current) => {
		const column = current % 7
		let row = 5
		while(row >= 0) {
			if(board[row*7 + column] === "") {
				return row*7 + column
			}
			--row;
		}
		return false
	}
	
	return(
		<main>
			<div className="card shadow-lg text-center p-3">
				<h1 className={turn ? "text-primary" : "text-danger"}>Connect 4</h1>
				<table className="table bg-secondary table-bordered m-0">
					<thead></thead>
					<tbody>
						{ Array.from({length: 6}, (v, i) => <Row key={i} board={board} row={i} handleClick={handleClick} />) }
					</tbody>
				</table>
			</div>
		</main>
	)
}
