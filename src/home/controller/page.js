export const getPage = (item_count, page_index=1, page_size=5) => {
  let [page_count, offset, limit, has_next, has_previous] = [];
  page_count = parseInt(item_count/page_size); 
  if (item_count % page_size > 0){
    page_count = page_count+1;
  }
  if (item_count == 0 || page_index > page_count){
    offset = 0;
    limit = 0;
    page_index = 1;
  } else {
    page_index = page_index;
    offset = page_size * (page_index - 1);
    limit = page_size;
  }
  has_next = page_index < page_count;
  has_previous = page_index > 1;
  return {
    item_count: item_count,
    page_index: page_index,
    page_size: page_size,
    page_count: page_count,
    offset: offset,
    limit: parseInt(limit),
    has_next: has_next,
    has_previous: has_previous,
  };
}
