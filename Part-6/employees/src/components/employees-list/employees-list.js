import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data}) => {
    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            // <EmployeesListItem key={id} name={itemProps.name} salary={itemProps.salary} increase={itemProps.increase}/>
            // или
            <EmployeesListItem key={id} {...itemProps}/>
        );
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployeesList;