import Todo from "./components/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTask from './components/Edit'
import './index.css'

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Todo />} />
					<Route path="/edit/:taskId" element={<EditTask />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
