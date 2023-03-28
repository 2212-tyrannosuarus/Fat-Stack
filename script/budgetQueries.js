function budgetedSpendingFunc(userId, fromDate, toDate) {
    let budgetedSpendingQuery = ` select 
    budgets.budget_name as "budgetName", 
    budgets.amount * 
    ((EXTRACT(year FROM age(to_date(${toDate},'YYYY-MM-DD'),to_date(${fromDate},'YYYY-MM-DD')))*12 + EXTRACT(month FROM age(to_date(${toDate},'YYYY-MM-DD'),to_date(${fromDate},'YYYY-MM-DD')))) +1)
    as "budgetedAmount", 
    budgets.date_started as "budgetStartDate",
    subcategories.sub_category_name as "subCategoryName", 
    subcategories.id as "subCategoryId",
    categories.category_name as "categoryName", 
    categories.id as "categoryId",
    coalesce(sum(transactions.amount),0) as "transactionAmount"
    from
    budgets,
    subcategories left outer join
    transactions on transactions."subcategoryId"=subcategories.id
    and transactions."userId"=${userId}
    and transactions.credit_debit = 'debit'
    and to_date(date,'YYYY-MM-DD') >= to_date(${fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${toDate},'YYYY-MM-DD'),
    categories
    where
    subcategories.id=budgets."subcategoryId"
    and categories.id=subcategories."categoryId"
    and budgets."userId"=${userId}
    and categories.category_name!='Income'
    group by 
    budgets.budget_name, 
    budgets.amount, 
    budgets.date_started,
    subcategories.sub_category_name, 
    subcategories.id,
    categories.category_name, 
    categories.id`;

    return budgetedSpendingQuery
}

function unbudgetedSpendingFunc(userId, fromDate, toDate) {
    let unbudgetedSpendingQuery = `select 
    subcategories.sub_category_name as "subCategoryName", 
    subcategories.id as "subCategoryId",
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
    and not exists (select 1 from budgets where budgets."subcategoryId" = subcategories.id)
    and subcategories.id=transactions."subcategoryId"
    and categories.id=subcategories."categoryId"
    and transactions."userId"=${userId}
    and transactions.credit_debit= 'debit'
    group by 
    subcategories.sub_category_name, 
    subcategories.id,
    categories.category_name, 
    categories.id`;

    return unbudgetedSpendingQuery;
}

function budgetedIncomeFunc(userId, fromDate, toDate) {
    const budgetedIncomeQuery = `select 
    budgets.budget_name as "budgetName", 
    budgets.amount * 
    ((EXTRACT(year FROM age(to_date(${toDate},'YYYY-MM-DD'),to_date(${fromDate},'YYYY-MM-DD')))*12 + EXTRACT(month FROM age(to_date(${toDate},'YYYY-MM-DD'),to_date(${fromDate},'YYYY-MM-DD')))) +1)
    as "budgetedAmount", 
    budgets.date_started as "budgetStartDate",
    subcategories.sub_category_name as "subCategoryName", 
    subcategories.id as "subCategoryId",
    categories.category_name as "categoryName", 
    categories.id as "categoryId",
    coalesce(sum(transactions.amount),0) as "transactionAmount"
    from
    budgets,
    subcategories left outer join
    transactions on transactions."subcategoryId"=subcategories.id
    and transactions."userId"=${userId}
    and transactions.credit_debit = 'credit'
    and to_date(date,'YYYY-MM-DD') >= to_date(${fromDate},'YYYY-MM-DD')
    and to_date(date,'YYYY-MM-DD') <= to_date(${toDate},'YYYY-MM-DD'),
    categories
    where
    subcategories.id=budgets."subcategoryId"
    and categories.id=subcategories."categoryId"
    and budgets."userId"=${userId}
    and categories.category_name='Income'
    group by 
    budgets.budget_name, 
    budgets.amount, 
    budgets.date_started,
    subcategories.sub_category_name, 
    subcategories.id,
    categories.category_name, 
    categories.id`;

    return budgetedIncomeQuery;
}

function budgetCategoriesFunc (userId) {
    const budgetCategoriesQuery = `	SELECT
    categories.category_name AS "categoryName",
    subcategories.sub_category_name AS "subCategoryName"
    FROM
    subcategories,
    categories
     WHERE
    categories.id = subcategories."categoryId"
    AND NOT EXISTS (
    SELECT
    1
    FROM
    budgets
    WHERE
    budgets."subcategoryId" = subcategories.id
    AND budgets."userId" = ${userId})
    GROUP BY
    categories.category_name,
    subcategories.sub_category_name
    ORDER BY
    categories.category_name ASC,
    subcategories.sub_category_name ASC`;

    return budgetCategoriesQuery
    }

module.exports = {budgetedSpendingFunc, unbudgetedSpendingFunc, budgetedIncomeFunc, budgetCategoriesFunc}