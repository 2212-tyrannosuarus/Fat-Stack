import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  updateSingleTransaction,
  selectAllSubCat,
  fetchAllSubCat,
} from "../../reducers/singleTransactionPageSlice";

export default function UpdateTransaction() {
  const [subcategoryId, setCategoryId] = useState(1);
  const allSubCategories = useSelector(selectAllSubCat);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSubCat());
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
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
        <input placeholder="Transaction Name" name="username" />
        <input placeholder="Transaction Amount" name="username" />
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
