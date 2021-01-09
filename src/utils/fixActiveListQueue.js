export default (list, activeIndex) => {
  const filteredList = list.filter((_, i) => activeIndex !== i);

  const newList = [...filteredList, list[activeIndex]];
  return newList;
};
