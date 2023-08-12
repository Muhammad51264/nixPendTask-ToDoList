import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function Market() {
const allColumns=JSON.parse(localStorage.getItem("data")).Columns;
    console.log(allColumns[0].tasks);

    let totalSubTasks = 0;
    let totalSubTasksArr=[];
    allColumns.forEach((column) => {
        let sum=0

      column.tasks.forEach((task) => {
        sum += task.subtask.length;
      });
      totalSubTasksArr.push(sum);
    });
    console.log('Total subtasks:', totalSubTasks);





    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          },
        },
      };
      
      const labels = ['to-do', 'doing', 'done'];
      
      // Replace this data with your own data

    //   const subTasks= todo.map((task)=>{todoSubTasks.push[task.subtask.length]})
      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: totalSubTasksArr.reverse(),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },

        ],
      };




  return (
  
    <div className="container-fluid row m-auto">
  <div className="col-12 col-sm-4 col-lg-2"></div>
  <div className="bar mt-5 col-12 col-sm-8 col-lg-10 mt-5" >

  <Bar options={options} data={data} />

  </div>
  </div>
  
  )






}

export default Market;
