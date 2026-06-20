import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Correct", value: correct },
  { name: "Wrong", value: wrong },
  {
    name: "Unattempted",
    value: total - attempted,
  },
];

const COLORS = ["#4CAF50", "#F44336", "#FFC107"];

<PieChart width={400} height={300}>
  <Pie
    data={data}
    cx="50%"
    cy="50%"
    outerRadius={100}
    dataKey="value"
    label
  >
    {data.map((entry, index) => (
      <Cell
        key={index}
        fill={COLORS[index]}
      />
    ))}
  </Pie>

  <Tooltip />
</PieChart>;