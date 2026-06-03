import { useEffect } from "react";
import DataCard from "./components/DataCard";
import ProductTable from "./components/ProductTable";
import LineChart from "../../components/common/Chart";

const Dashboard = () => {
  const products = [
    {
      id: 1,
      category: "دسته شماره فلان",
      title: "محصول فلان",
      status: "پایان یافته",
      remainingCount: null,
    },
    {
      id: 2,
      category: "دسته شماره فلان",
      title: "محصول فلان",
      status: "رو به اتمام",
      remainingCount: 4,
    },
    {
      id: 3,
      category: "دسته شماره فلان",
      title: "محصول فلان",
      status: "پایان یافته",
      remainingCount: null,
    },
    {
      id: 4,
      category: "دسته شماره فلان",
      title: "محصول فلان",
      status: "پایان یافته",
      remainingCount: null,
    },
    {
      id: 5,
      category: "دسته شماره فلان",
      title: "محصول فلان",
      status: "رو به اتمام",
      remainingCount: 2,
    },
  ];
  const chartData = {
    labels: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ],
    datasets: [
      {
        label: "فروش ماه",
        data: [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170],
        borderColor: "#0062ff",
        fill: true,
        tension: 0.4,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "نمودار فروش یک سال گذشته",
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: { display: true, title: { display: true } },
      y: { display: true, title: { display: true, text: "میلیون تومان" } },
    },
  };
  return (
    <div id="dashboard_section" className="dashboard_section main_section">
      <div className="row">
        <DataCard
          value={12}
          title="سبدخرید"
          subTitle="سبدخرید رهاشده شما"
          icon="fas fa-shopping-basket"
          week={12}
          moon={38}
        />

        <DataCard
          value={5}
          title="سفارشات مانده امروز"
          subTitle="سفارشات معلق و فاقد پرداختی"
          icon="fas fa-dolly"
          week={9}
          moon={16}
        />

        <DataCard
          value={45}
          title="سفارشات امروز"
          subTitle="سفارشات کامل و دارای پرداختی"
          icon="fas fa-luggage-cart"
          week={263}
          moon={1038}
        />

        <DataCard
          value={"1,500,000"}
          title="درآمد امروز"
          subTitle="جمع مبالغ پرداختی (تومان)"
          icon="fas fa-money-check-alt"
          week={"6,380,000"}
          moon={"22,480,000"}
        />
      </div>

      <div className="row">
        <ProductTable title="محصولات روبه اتمام" products={products} />

        <LineChart
          id="sales-chart"
          className="col-6"
          height={160}
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
