import style from "./Filter.module.scss";

const Filter = ({
  filters,
  setFilters,
  setSortOrder,
  setPriceFilter,
  sortOrder,
  priceFilter,
}) => {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePriceFromChange = (e) => {
    const value = e.target.value;
    setPriceFilter((prev) => ({ ...prev, from: value }));
  };

  const handlePriceToChange = (e) => {
    const value = e.target.value;
    setPriceFilter((prev) => ({ ...prev, to: value }));
  };

  return (
    <div className={style.filter}>
      <h2>фильтры</h2>
      <label>
        <input
          type="checkbox"
          name="sale"
          checked={filters.sale}
          onChange={handleChange}
          className={style.inputnone}
        />
        <p>Сегодня вам везёт</p> <div className={style.checkbox}></div>
      </label>
      <hr />
      <h3>Цена</h3>
      <div className={style.sort}>
        <label className={style.label}>
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="none">Без сортировки</option>
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </label>
      </div>
      <div className={style.priceRange}>
        <label>
          <input
            type="number"
            value={priceFilter.from}
            onChange={handlePriceFromChange}
          />
        </label>
        <p>—</p>
        <label>
          <input
            type="number"
            value={priceFilter.to}
            onChange={handlePriceToChange}
          />
        </label>
      </div>
      <hr />
      <h3>Бренды</h3>
      <div className={style.brends}>
        <label>
          <input
            type="checkbox"
            name="hawk"
            checked={filters.hawk}
            onChange={handleChange}
            className={style.inputnone}
          />
          <p>Hawk</p> <div className={style.checkbox}></div>
        </label>
        <label>
          <input
            type="checkbox"
            name="osse"
            checked={filters.osse}
            onChange={handleChange}
            className={style.inputnone}
          />
          <p>Osse</p> <div className={style.checkbox}></div>
        </label>
        <label>
          <input
            type="checkbox"
            name="mustang"
            checked={filters.mustang}
            onChange={handleChange}
            className={style.inputnone}
          />
          <p>Mustang</p> <div className={style.checkbox}></div>
        </label>
        <label>
          <input
            type="checkbox"
            name="diverso"
            checked={filters.diverso}
            onChange={handleChange}
            className={style.inputnone}
          />
          <p>Diverso</p> <div className={style.checkbox}></div>
        </label>
      </div>
      <hr />
      <h3>Гендер</h3>
      <div className={style.gender}>
        <label>
          <input
            type="checkbox"
            name="male"
            checked={filters.male}
            onChange={handleChange}
            className={style.inputnone}
          />
          <p>Мужские</p> <div className={style.checkbox}></div>
        </label>
        <label>
          <input
            type="checkbox"
            name="female"
            checked={filters.female}
            onChange={handleChange}
            className={style.inputnone}
          />
          <p>Женские</p> <div className={style.checkbox}></div>
        </label>
        <label>
          <input
            type="checkbox"
            name="unisex"
            checked={filters.unisex}
            onChange={handleChange}
            className={style.inputnone}
          />
          <p>Унисекс</p>
          <div className={style.checkbox}></div>
        </label>
        <label>
          <input
            type="checkbox"
            name="kid"
            checked={filters.kid}
            onChange={handleChange}
            className={style.inputnone}
          />
          <p>Детские</p>
          <div className={style.checkbox}></div>
        </label>
      </div>
      <hr />
      <h3>Тип</h3>
      <div className={style.type}>
        <label>
          <input
            type="checkbox"
            name="sunscreen"
            checked={filters.sunscreen}
            onChange={handleChange}
            className={style.inputnone}
          />
          <p>С/З</p>
          <div className={style.checkbox}></div>
        </label>
        <label>
          <input
            type="checkbox"
            name="optik"
            checked={filters.optik}
            onChange={handleChange}
            className={style.inputnone}
          />
          <p>Оптика</p> <div className={style.checkbox}></div>
        </label>
      </div>
    </div>
  );
};
export default Filter;
