import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Groups from "./pages/groups/groups";
import GroupDetails from "./pages/groups/GroupDetails";
import CreateEvent from "./pages/events/CreateEvent";
import EventDetails from "./pages/events/EventDetails";
import SplitPayment from "./pages/payments/SplitPayment";
import Notifications from "./pages/notifications/Notifications";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="groups" element={<Groups />} />
          <Route path="groups/:id" element={<GroupDetails />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="events/:id" element={<EventDetails />} />
          <Route path="split-payment/:id" element={<SplitPayment />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
