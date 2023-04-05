import { useState, useEffect } from "react";


function TaskForm(props) {

    const [name, setName] = useState('')
    const [status, setStatus] = useState(false)
    const [id, setId] = useState('')

    useEffect(() => { // khi nhấn sửa đổ dữ liệu của task ra form để sửa
        if (props.task) {
            setId(props.task.id)
            setName(props.task.name)
            setStatus(props.task.status)
        }
    }, [])

    const onCloseForm = () => {
        props.onCloseForm()
    }

    const onChange = (event) => {
        var name = event.target.name
        if (name === 'status') {
            const value = event.target.value === 'true' ? true : false
            setStatus(value)
        } else {
            setName(event.target.value)
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        props.onSubmit({ name, status, id })
        onClear()
        onCloseForm()
    }

    const onClear = () => {
        setName('')
        setStatus(false)
    }
    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">
                    {id == '' ? 'Thêm Công Việc' : 'Cập Nhật Công Việc'}
                    <span
                        className="fa fa-times-circle ml"
                        onClick={onCloseForm}
                    >
                    </span>
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input
                            type="text"
                            className="form-control"
                            name='name'
                            value={name}
                            onChange={onChange}
                        />
                    </div>
                    <label>Trạng Thái :</label>
                    <select
                        className="form-control"
                        required="required"
                        name='status'
                        value={status}
                        onChange={onChange}
                    >
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br />
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">Lưu Lại</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={onClear}>Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
