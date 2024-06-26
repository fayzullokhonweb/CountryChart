import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

function PieChart() {
  const [data, setData] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((countries) => {
        const sortedCountries = countries.sort((a, b) => b.area - a.area);
        const topCountries = sortedCountries.slice(0, 9);

        const names = topCountries.map((country) => country.name.common);
        const areas = topCountries.map((country) => country.area);

        setData({
          series: areas,
          options: {
            ...data.options,
            labels: names,
          },
        });
      });
  }, []);

  return (
    <div className="mt-8">
      <div className="max-w-5xl mx-auto">
        <p className="font-normal">
          ReactApexChart kutubxonasi yordamida Bar Charts yaratildi. Ushbu
          Diagramma barcha mamlakatlarning nomi va ularning yer maydoni katta
          maydondan kichik maydon tomon saralangan holatda ko'rsatadi.
        </p>
        <div className="mt-7">
          <Link
            className="px-5 py-2 rounded-lg text-sm tracking-wider font-medium border border-blue-700 outline-none bg-transparent hover:bg-blue-700 text-blue-700 hover:text-white transition-all duration-300"
            to="/BarChart"
          >
            Oldingi Diagramma
          </Link>
        </div>
      </div>
      <div>
        <div id="chart" className="w-3/4">
          <ReactApexChart
            options={data.options}
            series={data.series}
            type="pie"
            height={500}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    </div>
  );
}

export default PieChart;
