import './Tile.css'

export default function Tile(props) {
	return (
		<td>
			<span className={"tile " + props.board[props.value]} onClick={props.handleClick} >
				<input type="hidden" value={props.value} />
			</span>
		</td>
	)
}