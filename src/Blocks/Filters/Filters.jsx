import style from "./Filters.module.scss";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Cards from "./Cards/Cards";
import CardDetail from "./CardDetail/CardDetail";
import Filter from "./Filter/Filter";

function Filters() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    hawk: false,
    osse: false,
    mustang: false,
    diverso: false,
    sale: false,
    male: false,
    female: false,
    unisex: false,
    sunscreen: false,
    optik: false,
  });
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [priceFilter, setPriceFilter] = useState({ from: 0, to: 0 });

  const hideFilter = Boolean(location.pathname.match(/\/\d+$/));

  useEffect(() => {
    // Если путь — /filters и есть параметры activateFilters, они больше не нужны — сбрасываем
    if (location.pathname === "/filters" && location.search) {
      // Можно очистить параметры URL
      navigate("/filters", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const path = location.pathname;

    // Если на главной странице (без параметров) — сбрасываем фильтры
    if (path === "/filters?activateFilters=" && !location.search) {
      setFilters({
        hawk: false,
        osse: false,
        mustang: false,
        diverso: false,
        sale: false,
        male: false,
        female: false,
        unisex: false,
        kid: false,
        sunscreen: false,
        optik: false,
      });
    }

    // Если есть параметры activateFilters — активируем
    const params = new URLSearchParams(location.search);
    const activateFilters = params.get("activateFilters");
    if (activateFilters) {
      const filtersToActivate = activateFilters.split(","); // ['osse', 'optik']
      setFilters((prev) => {
        const newFilters = { ...prev };
        filtersToActivate.forEach((filter) => {
          if (filter in newFilters) {
            newFilters[filter] = true;
          }
        });
        return newFilters;
      });
    }
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const activateFilters = params.get("activateFilters");
    if (activateFilters) {
      const filtersToActivate = activateFilters.split(",");
      setFilters((prev) => {
        const newFilters = { ...prev };
        filtersToActivate.forEach((f) => {
          if (f in newFilters) newFilters[f] = true;
        });
        return newFilters;
      });
    }
    fetch("/ex.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if (data.length > 0) {
          const prices = data.map((p) => p.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceRange({ min: minPrice, max: maxPrice });
          setPriceFilter({ from: minPrice, to: maxPrice });
        }
      })
      .catch(console.error);
  }, [location.pathname, location.search]);

  return (
    <section className={style.filters}>
      {!hideFilter && (
        <Filter
          filters={filters}
          setFilters={setFilters}
          setSortOrder={setSortOrder}
          setPriceFilter={setPriceFilter}
          priceFilter={priceFilter}
          sortOrder={sortOrder}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Cards
              filters={filters}
              sortOrder={sortOrder}
              priceRange={priceRange}
              priceFilter={priceFilter}
              products={products}
              setPriceFilter={setPriceFilter}
            />
          }
        ></Route>
        <Route path=":id" element={<CardDetail />}></Route>
      </Routes>
    </section>
  );
}

export default Filters;
