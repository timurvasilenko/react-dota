import { Routes, Route, NavLink } from "react-router";

function App() {
    return (
        <>
            <nav>
                <NavLink to="/"></NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<div>123</div>} />
            </Routes>
        </>
    );
}

export default App;
