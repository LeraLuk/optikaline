import style from "./Cards.module.scss";
import Card from "./Card/Card";

function Cards({ filters, sortOrder, priceFilter, products }) {
  const filteredProducts = products.filter((product) => {
    // фильтр по ценам
    const withinPriceRange =
      product.price >= priceFilter.from && product.price <= priceFilter.to;

    // ПРОВЕРКА фильтров
    const desc = product.name.toLowerCase();
    const sale = product.sale.toLowerCase();
    const gender = product.gender.toLowerCase();
    const type = product.type.toLowerCase();

    // активные фильтры
    const activeFilters = Object.keys(filters).filter((key) => filters[key]);

    // товар должен содержать все активные фильтры
    const matchesFilter =
      activeFilters.length === 0 ||
      activeFilters.every(
        (filterKey) =>
          desc.includes(filterKey) ||
          sale.includes(filterKey) ||
          gender.includes(filterKey) ||
          type.includes(filterKey)
      );

    return matchesFilter && withinPriceRange;
  });
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priorityFilters = ["hawk", "osse", "mustang", "diverso"];

    // Проверяем, есть ли у товара активный приоритетный фильтр
    const aHasPriority = priorityFilters.some(
      (filter) =>
        filters[filter] && a.description.toLowerCase().includes(filter)
    );
    const bHasPriority = priorityFilters.some(
      (filter) =>
        filters[filter] && b.description.toLowerCase().includes(filter)
    );

    // Товары с приоритетных фильтров идут выше
    if (aHasPriority && !bHasPriority) return -1;
    if (!aHasPriority && bHasPriority) return 1;

    // Если оба или ни один не соответствуют приоритетным фильтрам, сортируем по цене
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className={style.cards}>
      {sortedProducts.length > 0 ? (
        sortedProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))
      ) : (
        <p>Доступных товаров нет</p>
      )}
    </div>
  );
}

export default Cards;
