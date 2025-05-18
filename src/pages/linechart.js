import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';
import axios from 'axios';
import './linechart.css';
import { API_URL } from '../App';
import DatePicker from 'react-datepicker';  // Add date picker component
import 'react-datepicker/dist/react-datepicker.css'; // Date picker styles
import Cookies from 'js-cookie';



ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler);

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Daily Earn $CUAN',
        data: [],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
      },
    ],
  });

  const [summaryData, setSummaryData] = useState({
    totalEarnings: 0,
    totalCompleted: 0,
    earningsInRange: 0,
  });

  const [dateRange, setDateRange] = useState('7'); // Default to 7 days
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateRangeLabel, setDateRangeLabel] = useState('Last 7 Days'); // Dynamic label
  const userId = Cookies.get('uuid');

  const generateCompleteDateRange = (startDate, endDate) => {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate).toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  const calculateSummary = (historyData, dateRange, start, end) => {
    const totalEarnings = historyData.reduce((sum, entry) => sum + entry.points, 0);
    const totalCompleted = historyData.filter(entry => entry.nameOffer !== 'Redeemed').length;

    const currentDate = new Date();

  // Filter entries within the specified time range
  const filteredData = historyData.filter(entry => {
    const entryDate = new Date(entry.date); // Convert entry date string to Date object

    if (dateRange === 'custom') {
      // Check if entryDate falls within the custom range
      const starttime = new Date(start);
      const endtime = new Date(end);
      return entryDate >= starttime && entryDate <= endtime;
    } else {
      // Calculate days difference for predefined ranges
      const timeDifference = currentDate - entryDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert time difference to days
      return daysDifference <= dateRange; // Only include entries within the desired range
    }
  });
  
    // Calculate total earnings within the time range
    const earningsInRange = filteredData.reduce((sum, entry) => sum + entry.points, 0);

    setSummaryData({ totalEarnings, totalCompleted, earningsInRange });
  };

  const fetchHistoryData = async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_URL}/api/chart-history`, {headers: {'x-hub-id': `Bearer ${userId}`,  },});
      const historyData = response.data
        .filter(entry => entry.nameOffer !== 'Redeemed')
        .map(entry => ({
          date: new Date(entry.date).toISOString().split('T')[0],
          points: entry.points || 0,
        }));

      const aggregatedData = historyData.reduce((acc, curr) => {
        acc[curr.date] = (acc[curr.date] || 0) + curr.points;
        return acc;
      }, {});

      const completeDateRange = generateCompleteDateRange(startDate, endDate);
      const labels = completeDateRange;
      const data = completeDateRange.map(date => aggregatedData[date] || 0);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Daily Earn $CUAN',
            data,
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.3,
          },
        ],
      });

      calculateSummary(historyData, dateRange, startDate, endDate);
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };

  useEffect(() => {
    let start, end;
    const today = new Date();

    switch (dateRange) {
      case '7':
        start = new Date(today.setDate(today.getDate() - 7));
        end = new Date();
        setDateRangeLabel('Last 7 Days');
        break;
      case '30':
        start = new Date(today.setDate(today.getDate() - 30));
        end = new Date();
        setDateRangeLabel('Last 30 Days');
        break;
      case '90':
        start = new Date(today.setDate(today.getDate() - 90));
        end = new Date();
        setDateRangeLabel('Last 90 Days');
        break;
      case '365':
        start = new Date('2024-01-01');
        end = new Date('2024-12-31');
        setDateRangeLabel('Year 2024');
        break;
      case 'custom':
        start = startDate;
        end = endDate;
        setDateRangeLabel(`Custom Range: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
        break;
      default:
        start = new Date(today.setDate(today.getDate() - 7));
        end = new Date();
        setDateRangeLabel('Last 7 Days');
    }

    fetchHistoryData(start, end);
  }, [dateRange, startDate, endDate]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$CUAN: ${context.raw}`;
          },
        },
        bodyFont: {
          size: 16,
        },
        titleFont: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM d',
          },
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '$CUAN',
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="controls">
        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
          <option value="7">Past 7 Days</option>
          <option value="30">Past 30 Days</option>
          <option value="90">Past 90 Days</option>
          <option value="365">Year 2024</option>
          <option value="custom">Custom Range</option>
        </select>
        {dateRange === 'custom' && (
          <div className="date-picker">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="End Date"
            />
          </div>
        )}
      </div>

      {/* Summary Section Positioned Below Dropdown */}
      <div className="summary-container">
        <div className="summary-item">
          <h4>Total Earnings</h4>
          <p style={{ color: '#28a745' }}>{summaryData.totalEarnings.toLocaleString()} $CUAN</p>
        </div>
        <div className="summary-item">
          <h4>Total Completed</h4>
          <p style={{ color: '#28a745' }}>{summaryData.totalCompleted}</p>
        </div>
        <div className="summary-item">
          <h4>Earnings ({dateRangeLabel})</h4> {/* Dynamically update based on date range */}
          <p style={{ color: '#28a745' }}>{summaryData.earningsInRange.toLocaleString()} $CUAN</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
