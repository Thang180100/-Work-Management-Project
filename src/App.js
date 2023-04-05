
import { useEffect, useState } from 'react';
import './App.css';
import Control from './components/Control';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {

  const [tasks, setTasks] = useState([])
  const [isDisplayForm, setIsDisplayForm] = useState(false)
  const [taskEditing, setTaskEditing] = useState(null)
  const [keyword, setKeyword] = useState('')

  var ft = {
    name: '',
    status: -1
  }
  const [filter, setFilter] = useState(ft)

  var s = {
    by: 'name',
    value: 1
  }
  const [sort, setSort] = useState(s)

  useEffect(() => {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'))

      if (filter) {
        if (filter.name) {
          tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(filter.name) !== -1
          })
        }
      }

      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task
        } else {
          return task.status === (filter.status === 1 ? true : false)
        }
      })

      if (keyword) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(keyword) !== -1
        })
      }

      if (s.by === 'name') {
        tasks.sort((a, b) => {
          if (a.name < b.name) return s.value
          else if (a.name < b.name) return -s.value
          else return 0
        })
      } else {
        tasks.sort((a, b) => {
          if (a.status < b.status) return -s.value
          else if (a.status < b.status) return s.value
          else return 0
        })
      }
      setTasks(tasks)
    }
  }, [filter, keyword], [sort])

  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }
  function generateID() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4()
  }
  const onToggleForm = () => {
    setIsDisplayForm(!isDisplayForm)
  }

  const onCloseForm = () => {
    setIsDisplayForm(false)
  }

  const onSubmit = (data) => {
    if (data.id === '') {
      data.id = generateID()
      tasks.push(data)
    } else {
      var index = findIndex(data.id)
      tasks[index] = data
    }
    setTasks(tasks)
    setTaskEditing(null)

    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const onUpdateStatus = (id) => {
    var index = findIndex(id)
    if (index !== -1) {
      tasks[index].status = !tasks[index].status
    }
    setTasks(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const findIndex = (id) => {
    var result = -1
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index
      }
    })
    return result
  }

  const onDelete = (id) => {
    var index = findIndex(id)
    if (index !== -1) {
      tasks.splice(index, 1)
    }
    setTasks(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    onCloseForm()
  }

  const onShowForm = () => {
    setIsDisplayForm(true)
  }

  const onFix = (id) => {
    var index = findIndex(id)
    var taskEditing = tasks[index]
    setTaskEditing(taskEditing)
    onShowForm()
  }

  const onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10)
    const ft = {
      name: filterName.toLowerCase(),
      status: filterStatus
    }
    setFilter(ft)
  }

  const onSearch = (keyword) => {
    setKeyword(keyword)
  }

  const onSort = (sortBy, sortValue) => {
    const s = {
      by: sortBy,
      value: sortValue
    }
    setSort(s)
  }


  const elmTaskForm = isDisplayForm ? <TaskForm // isDisplayForm = true thì mở form còn = false thì đóng form
    onCloseForm={onCloseForm}
    onSubmit={onSubmit}
    task={taskEditing}
  /> : ''


  return (
    < div className="container" >
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row">
        <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
          {elmTaskForm}
        </div>
        <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
          <button type="button"
            className="btn btn-primary"
            onClick={onToggleForm}
          >
            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
          </button>

          <Control onSearch={onSearch} onSort={onSort} />

          <div className="row mt-15">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <TaskList tasks={tasks} onUpdateStatus={onUpdateStatus} onDelete={onDelete} onFix={onFix} onFilter={onFilter} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
