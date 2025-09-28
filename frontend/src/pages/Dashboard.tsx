// src/pages/Dashboard.tsx
import Navbar from "@/components/dashboard/Navbar";
import NotesList from "@/components/dashboard/NotesList";
import UserCard from "@/components/dashboard/UserCard";


function Dashboard() {


  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <UserCard />
        <NotesList />
      </div>
    </div>
  );
}

export default Dashboard;
