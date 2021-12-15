module.exports = (queryParams) => {
  const sortBy = 'createDate';
  const sortOrder = 'desc';
  const options = {
    page: 1,
    limit: 20,
    sort: {
      [sortBy]: sortOrder,
    },
  };

  // handle pagination parameters
  if (queryParams.page) options.page = queryParams.page;
  if (queryParams.pageSize) options.limit = queryParams.pageSize;
  if (queryParams.sortBy || queryParams.sortOrder) {
    options.sort = {
      [queryParams.sortBy || sortBy]: queryParams.sortOrder || sortOrder,
    };
  }
  return options;
};
