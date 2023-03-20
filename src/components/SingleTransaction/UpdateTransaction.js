import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  updateSingleTransaction,
  selectAllSubCat,
  fetchAllSubCat,
  updateAllTransactionCat,
  selectSingleTransaction,
} from "../../reducers/singleTransactionPageSlice";

export default function UpdateTransaction() {
  const [subcategoryId, setCategoryId] = useState(27);
  const [changeAll, setChangeAll] = useState(false);
  const allSubCategories = useSelector(selectAllSubCat);
  const { id } = useParams();
  const transaction = useSelector(selectSingleTransaction);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSubCat());
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (changeAll) {
      await dispatch(
        updateAllTransactionCat({
          name: transaction.merchant,
          body: { subcategoryId: subcategoryId },
        })
      );
    }
    await dispatch(
      updateSingleTransaction({
        id: id,
        body: { subcategoryId: subcategoryId },
      })
    );
  };

  return (
    <div className="test-form-container">
      <form className="test-form" onSubmit={handleUpdate}>
        <input placeholder="Description" name="merchant" />
        <input placeholder="Transaction Amount" name="username" />
        <div className="mb-3 row">
          <label htmlFor="html5-date-input" className="col-md-2 col-form-label">
            Date
          </label>
          <div className="col-md-10">
            <input
              className="form-control"
              type="date"
              // value="2023-03-20"
              id="html5-date-input"
            />
          </div>
        </div>
        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            value={changeAll}
            id="defaultCheck1"
            onChange={(e) => {
              setChangeAll(!changeAll);
            }}
          />
          <label className="form-check-label" htmlFor="defaultCheck1">
            Change All
          </label>
        </div>

        <select
          id="color_category"
          name="color_category"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {allSubCategories.map((option) => (
            <option key={option.id} value={option.id}>
              {" "}
              {option.sub_category_name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Submit</button>
        <br />
      </form>
    </div>
  );
}
