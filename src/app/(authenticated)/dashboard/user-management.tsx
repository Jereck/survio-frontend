"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

interface User {
  id: string;
  email: string;
  role: string;
}

export default function UserManagement() {
  const { token, user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      console.log("Fetched Users:", data);
      console.log("Current User:", user);

      // 🔥 Exclude the current logged-in user
      if (user){
        setUsers(data.filter((u: User) => u.id !== user?.userId));
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, [token, user]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const res = await fetch(`${API_URL}/users/change-role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, newRole }),
    });

    if (res.ok) {
      setMessage("Role updated successfully!");
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    }
  };

  const handleRemoveUser = async (userId: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setMessage("User removed successfully!");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold">User Management</h3>
      {message && <p className="text-green-600">{message}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between p-2 border rounded mt-2">
            <span>{user.email} ({user.role})</span>
            <div>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                className="border p-1 mr-2"
              >
                <option value="owner">Owner</option>
                <option value="viewer">Viewer</option>
                <option value="researcher">Researcher</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={() => handleRemoveUser(user.id)}
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
