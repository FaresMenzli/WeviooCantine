import { FC } from "react";
import Table from "./Table";

interface TestComponentProps {
    
}

 
const TestComponent: FC<TestComponentProps> = () => { 
    const data = [
        { id: 1, name: 'John', age: 25 },
        { id: 2, name: 'Jane', age: 30 },
        { id: 3, name: 'Bob', age: 35 },
        { id: 4, name: 'Alice', age: 28 },
        { id: 5, name: 'Michael', age: 40 },
        { id: 6, name: 'Sara', age: 22 },
        { id: 7, name: 'David', age: 33 },
        { id: 8, name: 'Emily', age: 29 },
        { id: 9, name: 'Daniel', age: 37 },
        { id: 10, name: 'Linda', age: 26 },
        { id: 11, name: 'Chris', age: 31 },
        { id: 12, name: 'Michelle', age: 42 },
        // Add more data as needed
      ];
    return (  <div className="App">
    <h1>Table with Pagination</h1>
    {/*  <Table data={data} itemsPerPage={2} />  */}
  </div> );
}
 
export default TestComponent;