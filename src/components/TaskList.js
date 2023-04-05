import { useState } from "react";
import TaskItem from "./TaskItem";

function TaskList(props) {

    const [filterName, setFilterName] = useState('')
    const [filterStatus, setFilterStatus] = useState(-1) // tất cả : -1 , ẩn : 0 , kích hoạt : 1 

    const { tasks } = props
    const elmTasks = tasks.map((task, index) => {
        return <TaskItem
            key={task.id}
            index={index}
            task={task}
            onUpdateStatus={props.onUpdateStatus}
            onDelete={props.onDelete}
            onFix={props.onFix}
        />
    })

    const onChange = (event) => {
        var name = event.target.name
        var value = event.target.value
        if (name === 'filterStatus') {
            setFilterStatus(value)
        } else {
            setFilterName(value)
        }
        props.onFilter(
            name === 'filterName' ? value : filterName,
            name === 'filterStatus' ? value : filterStatus
        )
    }

    return (
        < table className="table table-bordered table-hover" >
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            name="filterName"
                            value={filterName}
                            onChange={onChange}
                        />
                    </td>
                    <td>
                        <select
                            className="form-control"
                            name="filterStatus"
                            value={filterStatus}
                            onChange={onChange}>

                            <option value={-1}>Tất Cả</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {elmTasks}
            </tbody>
        </table >
    );
}

export default TaskList;
