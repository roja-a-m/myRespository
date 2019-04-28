module.exports = function paginate(sourceList, page, perPage) {
  var totalCount = sourceList.length;
  var lastPage = Math.floor(totalCount / perPage);
  var sliceBegin = page*perPage;
  var sliceEnd = sliceBegin+perPage;
  var pageList = sourceList.slice(sliceBegin, sliceEnd);
  return {
    pageData: pageList,
    nextPage: page < lastPage ? page+1 : null,
    totalCount: totalCount
  }
}