import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateSingleTransaction } from "../../reducers/singleTransactionPageSlice";

export default function UpdateTransaction() {
  const [subcategoryId, setCategoryId] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();

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
        <input
          placeholder="Category"
          name="categoryId"
          value={subcategoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
        <br />

        {/* <select
          id="color_category"
          name="color_category"
          onChange={(e) => setColor_category(e.target.value)}
        >
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Blue">Blue</option>
        </select> */}
        <br />
        <button type="submit">Submit</button>
        <br />
      </form>
    </div>
  );
}
