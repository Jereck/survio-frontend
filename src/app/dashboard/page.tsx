"use client";

import { useAuthStore } from "../../store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TeamManagement from "./team-management";
import SurveyManagement from "./survey-management";
import UserManagement from "./user-management";
import TeamAssignment from "./team-assignment";

interface Team {
  id: string;
  name: string;
}

interface Survey {
  id: string;
  title: string;
}

export default function DashboardPage() {
  const { user, token, logout } = useAuthStore();
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    console.log("Dashboard token:", token);

    const fetchData = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      try {
        const resTeams = await fetch(`${API_URL}/teams`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeams(await resTeams.json());

        const resSurveys = await fetch(`${API_URL}/surveys`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSurveys(await resSurveys.json());
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Show Team Management to all roles except Viewers */}
        {user?.role !== "viewer" && (
          <TeamManagement teams={teams} refreshTeams={() => setTeams([...teams])} />
        )}

        {/* Show Survey Management to Researchers, Admins, and Owners */}
        {(user?.role === "researcher" || user?.role === "admin" || user?.role === "owner") && (
          <SurveyManagement surveys={surveys} refreshSurveys={() => setSurveys([...surveys])} />
        )}

        {/* Show User Management ONLY to Admins & Owners */}
        {(user?.role === "admin" || user?.role === "owner") && <UserManagement />}

        {user?.role === "owner" || user?.role === "admin" ? <TeamAssignment /> : null}
      </div>
    </div>
  );
}
