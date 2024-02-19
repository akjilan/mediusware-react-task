import React, {useState} from 'react';

const Problem1 = () => {

    const [tasks, setTasks] = useState([]);
    const [filterOption, setFilterOption] = useState('all');

    // Function to handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const nameInput = event.target.elements.name.value;
        const statusInput = event.target.elements.status.value;
        const newTask = { name: nameInput, status: statusInput };
        setTasks([...tasks, newTask]);
        event.target.reset();
    };

    // Function to filter and sort tasks
    const filteredAndSortedTasks = () => {
        if (filterOption === 'all') {
            return tasks.sort((a, b) => {
                if (a.status === 'active' && b.status !== 'active') return -1;
                if (a.status !== 'active' && b.status === 'active') return 1;
                if (a.status === 'completed' && b.status !== 'completed') return -1;
                if (a.status !== 'completed' && b.status === 'completed') return 1;
                return 0;
            });
        } else {
            return tasks.filter(task => task.status === filterOption);
        }
    };

    // Function to handle filter options change
    const handleFilterChange = (option) => {
        setFilterOption(option);
    };



    return (
        <div className="container">
        <div className="row justify-content-center mt-5">
            <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
            <div className="col-6 ">
                <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                    <div className="col-auto">
                        <input type="text" className="form-control" placeholder="Name" name="name" />
                    </div>
                    <div className="col-auto">
                        <input type="text" className="form-control" placeholder="Status" name="status" />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
            <div className="col-8">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <button className={`nav-link ${filterOption === 'all' && 'active'}`} type="button" onClick={() => handleFilterChange('all')}>All</button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${filterOption === 'active' && 'active'}`} type="button" onClick={() => handleFilterChange('active')}>Active</button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${filterOption === 'completed' && 'active'}`} type="button" onClick={() => handleFilterChange('completed')}>Completed</button>
                    </li>
                </ul>
                <table className="table table-striped ">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedTasks().map((task, index) => (
                            <tr key={index}>
                                <td>{task.name}</td>
                                <td>{task.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
};

export default Problem1;