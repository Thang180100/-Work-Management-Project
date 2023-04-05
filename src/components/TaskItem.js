
function TaskItem(props) {
    const { task, index } = props

    const onUpdateStatus = () => {
        props.onUpdateStatus(props.task.id)
    }

    const onDelete = () => {
        props.onDelete(props.task.id)
    }

    const onFix = () => {
        props.onFix(props.task.id)
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <span
                    className={task.status === true ? 'label label-danger' : 'label label-success'}
                    onClick={onUpdateStatus}
                >
                    {task.status === true ? 'Kích hoạt' : 'Ẩn'}
                </span>
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning" onClick={onFix}>
                    <span className="fa fa-pencil mr-5"></span>Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={onDelete}>
                    <span className="fa fa-trash mr-5"></span>Xóa
                </button>
            </td>
        </tr>
    );
}

export default TaskItem;
