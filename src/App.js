import 'bootstrap/dist/css/bootstrap.min.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import './App.css';
import Row from './Row';
import { useEffect, useState } from 'react';

export default function App() {
	const [ board, setBoard ] = useState(Array(42).fill(""))
	const [ turn, setTurn ] = useState("Blue")
	const [ resultModal, setResultModal ] = useState(null)
	useEffect(() => {
		setResultModal(new bootstrap.Modal(document.getElementById('resultModal'), { keyboard: false, backdrop: 'static' }))
	}, [])
	const restart = () => window.location.reload()
	const handleMouseEnter = (e) => {
		const column = e.target.querySelector('input').value % 7
		document.getElementById("arrow" + column).className = turn === "Blue" ? "bg-primary" : "bg-danger"
	}
	const handleMouseLeave = (e) => {
		const column = e.target.querySelector('input').value % 7
		document.getElementById("arrow" + column).className = ""
	}
	const handleClick = (e) => {
		const tile = e.target.querySelector('input').value
		const position = getLowestPlace(tile)
		let _board = [ ...board ]
		if(position !== false) {
			_board[position] = turn === "Blue" ? "Blue" : "Red"
			setBoard(_board)
			if(checkWin(position)) {
				resultModal.show()
			}
			else {
				setTurn(_turn => turn === "Blue" ? "Red" : "Blue")
			}
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
	const checkWin = (current) => {
		const column = current % 7
		const row = (current - column) / 7
		let nw = Math.min(column, row)
		let ne = Math.min(6-column, row)
		let count = 0
		// Horizontal
		for(let temp_column = 0; temp_column < 7; ++temp_column) {
			if(board[row*7 + temp_column] === turn) {
				if(++count > 2) return true
			}
			else {
				count = 0
			}
		}
		count = 0
		// Vertical
		for(let temp_row = 0; temp_row < 6; ++temp_row) {
			if(board[temp_row*7 + column] === turn) {
				if(++count > 2) return true
			}
			else {
				count = 0
			}
		}
		count = 0
		// L2R Diagonal
		for(let temp_row = row - nw, temp_column = column - nw; temp_row < 5 || temp_column < 6; ++temp_row, ++temp_column) {
			if(board[temp_row*7 + temp_column] === turn) {
				if(++count > 2) return true
			}
			else {
				count = 0
			}
		}
		count = 0
		// R2l Diagonal
		for(let temp_row = row - ne, temp_column = column + ne; temp_row < 5 || temp_column > 0; ++temp_row, --temp_column) {
			if(board[temp_row*7 + temp_column] === turn) {
				if(++count > 2) return true
			}
			else {
				count = 0
			}
		}
		count = 0
		return false
	}
	return(
		<main>
			<div className="modal fade" id="resultModal" tabIndex="-1" aria-labelledby="resultModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h3 className="modal-title" id="resultModalLabel">Game Over</h3>
						</div>
						<div className="modal-body">
							<h5><span className={turn === "Blue" ? "text-primary" : "text-danger"}>{turn}</span> has won the game!</h5>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" onClick={restart}>Restart</button>
						</div>
					</div>
				</div>
			</div>
			<div className="card shadow-lg text-center p-3">
				<h1 className={turn === "Blue" ? "text-primary" : "text-danger"}>Connect 4</h1>
				<table className="table bg-secondary m-0">
					<thead>
						<tr className="bg-white">
							<th id="arrow0"></th>
							<th id="arrow1"></th>
							<th id="arrow2"></th>
							<th id="arrow3"></th>
							<th id="arrow4"></th>
							<th id="arrow5"></th>
							<th id="arrow6"></th>
						</tr>
					</thead>
					<tbody>
						{ Array.from({length: 6}, (v, i) => 
							<Row key={i} board={board} row={i} handleClick={handleClick} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />)
						}
					</tbody>
				</table>
			</div>
		</main>
	)
}
