import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

function BarChart() {
  const [data, setData] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    let allPopulations = [];
    let allNames;

    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((countries) => {
        const names = countries
          .sort((a, b) => b.population - a.population)
          .map((country) => {
            console.log(country.region);
            return country.name.common;
          });
        allNames = names;
        const populations = countries
          .sort((a, b) => b.population - a.population)
          .map((country) => {
            return country.population;
          });
        allPopulations = populations;

        setData({
          series: [
            {
              data: allPopulations,
            },
          ],
          options: {
            ...data.options,
            xaxis: {
              categories: allNames,
            },
          },
        });
      });
  }, []);

  return (
    <div className="mt-8 mb-8">
      <div className="max-w-5xl mx-auto ">
        <p className="font-normal">
          ReactApexChart kutubxonasi yordamida Bar Charts yaratildi. Ushbu
          Diagramma barcha mamlakatlarning nomi va ularning aholisini katta
          aholidan kichik aholi tomon saralangan holatda ko'rsatadi.
        </p>
        <div className="mt-7 ">
          <Link
            className=" px-5 py-2 rounded-lg text-sm tracking-wider font-medium border border-blue-700 outline-none bg-transparent hover:bg-blue-700 text-blue-700 hover:text-white transition-all duration-300 "
            to="/PieChart"
          >
            Keyingi Diagramma
          </Link>
        </div>
      </div>
      <div id="chart">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="bar"
          height={4500}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default BarChart;
