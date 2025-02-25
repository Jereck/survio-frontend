"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";

interface Member {
  id: string;
  email: string;
  role: string;
}

export default function TeamMembers({ teamId }: { teamId: string }) {
  const { token } = useAuthStore();
  const [members, setMembers] = useState<Member[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/teams/${teamId}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(await res.json());
    };

    fetchMembers();
  }, [teamId, token]);

  const handleRoleChange = async (memberId: string, newRole: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const res = await fetch(`${API_URL}/teams/members/${memberId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newRole }),
    });

    if (res.ok) {
      setMessage("Role updated successfully!");
      setMembers((prev) =>
        prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
      );
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${API_URL}/teams/members/${memberId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setMessage("Member removed successfully!");
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold">Team Members</h3>
      {message && <p className="text-green-600">{message}</p>}
      <ul>
        {members.map((member) => (
          <li key={member.id} className="flex justify-between p-2 border rounded mt-2">
            <span>{member.email} ({member.role})</span>
            <div>
              <select
                value={member.role}
                onChange={(e) => handleRoleChange(member.id, e.target.value)}
                className="border p-1 mr-2"
              >
                <option value="viewer">Viewer</option>
                <option value="researcher">Researcher</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={() => handleRemoveMember(member.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
