function trendsOvertimeFunc(userId, fromDate, toDate) {
    const trendsOvertimeQuery = `select 
    to_char(to_date(date,'YYYY-MM-DD'),'yyyy-mm') as "yearmonth",
    transactions.credit_debit,
    sum(transactions.amount) as "transactionAmount"
    from
    transactions
    where
    to_date(date,'YYYY-MM-DD') >= to_date(${fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${toDate},'YYYY-MM-DD')
    and transactions."userId"=${userId}
    group by
    transactions.credit_debit,
    yearmonth
    order by yearmonth`;

    return trendsOvertimeQuery;
}

function trendsCategoryPieFunc(userId, fromDate, toDate) {
    const trendsCategoryPieQuery = `select 
    categories.category_name as "categoryName", 
    categories.id as "categoryId",
    sum(transactions.amount) as "transactionAmount"
    from
    transactions,
    subcategories,
    categories
    where
    to_date(date,'YYYY-MM-DD') >= to_date(${fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${toDate},'YYYY-MM-DD')
    and subcategories.id=transactions."subcategoryId"
    and categories.id=subcategories."categoryId"
    and transactions."userId"=${userId}
    and transactions.credit_debit= 'debit'
    group by 
    categories.category_name, 
    categories.id
    order by 
    "transactionAmount" desc`;

    return trendsCategoryPieQuery;
}

function trendsMerchantPieFunc(userId, fromDate, toDate) {
    const trendsMerchantPieQuery = `select merchant,
    sum(transactions.amount) as "transactionAmount"
    from transactions
    where
    to_date(date,'YYYY-MM-DD') >= to_date(${fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${toDate},'YYYY-MM-DD')
    and transactions."userId"=${userId}
    and transactions.credit_debit= 'debit'
    group by merchant
    order by 
    "transactionAmount" desc`;

    return trendsMerchantPieQuery;
}

function trendsOvertimeBySubCategoryFunc(userId, fromDate, toDate, subcategory) {
    const trendsOvertimeBySubCategoryQuery = `select 
    to_char(to_date(date,'YYYY-MM-DD'),'yyyy-mm') as "yearmonth",
    transactions.credit_debit,
    sum(transactions.amount) as "transactionAmount",
    subcategories.sub_category_name as "subcategoryName"
    from
    transactions,
    subcategories
    where
    to_date(date,'YYYY-MM-DD') >= to_date(${fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${toDate},'YYYY-MM-DD')
    and transactions."userId"=${userId}
    and transactions."subcategoryId"=subcategories.id
    and subcategories.sub_category_name=${subcategory}
    group by
    transactions.credit_debit,
    yearmonth,
    subcategories.sub_category_name
    order by yearmonth`;

    return trendsOvertimeBySubCategoryQuery;
}

function trendsCategoriesFunc(userId, fromDate, toDate) {
    const trendsCategoriesQuery = `SELECT
    categories.category_name AS "categoryName",
    subcategories.sub_category_name AS "subCategoryName",
    sum(transactions.amount) AS "transactionAmount"
  FROM
    subcategories,
    categories,
    transactions
  WHERE
    categories.id = subcategories."categoryId"
    and transactions."subcategoryId"=subcategories.id
    and transactions.credit_debit='debit'
and to_date(date,'YYYY-MM-DD') >= to_date(${fromDate},'YYYY-MM-DD')
and to_date(date,'YYYY-MM-DD') <= to_date(${toDate},'YYYY-MM-DD')
and transactions."userId"=${userId}
  GROUP BY
    categories.category_name,
    subcategories.sub_category_name
  ORDER BY
    categories.category_name ASC,
    subcategories.sub_category_name ASC`;

    return trendsCategoriesQuery;
}

function trendsOverviewChartFunc(userId, fromDate, toDate) {
    const trendsOverviewChartQuery = `select 
    to_char(to_date(date,'YYYY-MM-DD'),'yyyy-mm-dd') as "yearmonthday",
    sum(transactions.amount) as "transactionAmount"
    from
    transactions
    where
    transactions.credit_debit= 'debit'
    and to_date(date,'YYYY-MM-DD') >= to_date(${fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${toDate},'YYYY-MM-DD')
    and transactions."userId"=${userId}
    group by 
    yearmonthday`;

    return trendsOverviewChartQuery;
}

module.exports = {trendsOvertimeFunc, trendsCategoryPieFunc, trendsMerchantPieFunc, trendsOvertimeBySubCategoryFunc, trendsCategoriesFunc, trendsOverviewChartFunc}