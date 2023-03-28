function transactionsByDateQuery(fromDate, toDate, userId) {
  let transactionsQuery = `
select
*
   
from
  transactions
  
  where
  to_date(date, 'YYYY-MM-DD') >= to_date('${fromDate}', 'YYYY-MM-DD')
  and to_date(date, 'YYYY-MM-DD') <= to_date('${toDate}', 'YYYY-MM-DD')
  and "userId" = ${userId}

order by 
to_date(date, 'YYYY-MM-DD') desc
    `;

  return transactionsQuery;
}
module.exports = { transactionsByDateQuery };
