import Search from "./Search";
import Sort from "./Sort";



function Control(props) {
    return (
        <div className="row mt-15">
            <Search onSearch={props.onSearch} />
            <Sort onSort={props.onSort}  />
        </div>
    );
}

export default Control;
