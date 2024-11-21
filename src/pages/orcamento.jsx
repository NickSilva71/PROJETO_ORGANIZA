import React, { useState } from "react";
import { Inter } from "next/font/google";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Orcamento() {
  const [budgetData, setBudgetData] = useState([
    { category: "Alimentação", budget: 500, actual: 300 },
    { category: "Transporte", budget: 200, actual: 150 },
    { category: "Lazer", budget: 100, actual: 120 },
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newActual, setNewActual] = useState("");

  // Função para adicionar uma nova categoria de orçamento
  const addCategory = () => {
    if (newCategory && newBudget && newActual) {
      setBudgetData([
        ...budgetData,
        { category: newCategory, budget: parseFloat(newBudget), actual: parseFloat(newActual) },
      ]);
      setNewCategory("");
      setNewBudget("");
      setNewActual("");
    }
  };

  // Função para verificar se os gastos estão próximos ou excedendo o orçamento
  const checkBudgetAlert = (budget, actual) => {
    const percentage = (actual / budget) * 100;

    if (actual > budget) {
      return '⚠️ Excedeu o orçamento!';
    } else if (percentage > 80) {
      return '⚠️ Gastos próximos do limite (80%)!';
    } else {
      return ''; // Nenhum alerta
    }
  };


  return (
    
    <div>
      <Sidebar />
      <div className="flex flex-col font-medium text-2xl text-center p-6 max-w-fit m-auto border-r-2 border-b-2 border-teal-600 bg-teal-100 rounded-xl shadow-lg">
        <h1>Pagina de Orçamento</h1>
        <h1>Orçamento Mensal</h1>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Categoria"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <input
            type="number"
            placeholder="Orçamento"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <input
            type="number"
            placeholder="Gasto Real"
            value={newActual}
            onChange={(e) => setNewActual(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <button onClick={addCategory} style={{
            "background-color": "#0070f3",
            "border-radius": "5px",
            "color": "white",
            "font-weight": "bold"
          }}><span style={{
            "padding": "10px",
          }}>Adicionar Categoria</span></button>
        </div>

        {/* Tabela mostrando o orçamento, gasto real e alerta */}
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Orçamento</th>
              <th>Gasto Real</th>
              <th>Alerta</th>
            </tr>
          </thead>
          <tbody>
            {budgetData.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>R$ {item.budget.toFixed(2)}</td>
                <td>R$ {item.actual.toFixed(2)}</td>
                <td style={{ color: item.actual > item.budget ? 'red' : 'orange' }}>
                  {checkBudgetAlert(item.budget, item.actual)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Gráfico de barras mostrando orçamento e gasto real */}
        <BarChart
          width={600}
          height={300}
          data={budgetData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Orçamento" />
          <Bar dataKey="actual" fill="#82ca9d" name="Gasto Real" />
        </BarChart>
      </div>
    </div>
    
  );
}
