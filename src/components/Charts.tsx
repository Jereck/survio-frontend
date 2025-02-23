"use client"

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BarChart as RechartsBarChart, Bar } from 'recharts'
import { PieChart as RechartsPieChart, Pie, Cell } from 'recharts'

const lineData = [
  { name: 'Jan', responses: 400 },
  { name: 'Feb', responses: 300 },
  { name: 'Mar', responses: 500 },
  { name: 'Apr', responses: 700 },
  { name: 'May', responses: 600 },
  { name: 'Jun', responses: 800 },
]

export const LineChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsLineChart data={lineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="responses" stroke="#8884d8" activeDot={{ r: 8 }} />
    </RechartsLineChart>
  </ResponsiveContainer>
)

const barData = [
  { name: 'Survey A', responses: 400 },
  { name: 'Survey B', responses: 300 },
  { name: 'Survey C', responses: 500 },
  { name: 'Survey D', responses: 700 },
  { name: 'Survey E', responses: 600 },
]

export const BarChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsBarChart data={barData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="responses" fill="#8884d8" />
    </RechartsBarChart>
  </ResponsiveContainer>
)

const pieData = [
  { name: 'Completed', value: 400 },
  { name: 'Partial', value: 300 },
  { name: 'Abandoned', value: 300 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

export const PieChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsPieChart>
      <Pie
        data={pieData}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </RechartsPieChart>
  </ResponsiveContainer>
)
