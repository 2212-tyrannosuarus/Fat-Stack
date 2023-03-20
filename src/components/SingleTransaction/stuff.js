<div className="row">
  <div className="demo-vertical-spacing demo-only-element col-md-8 ">
    <div className="input-group input-group-merge">
      <span className="input-group-text" id="basic-addon-search31">
        <i className="bx bx-search"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        aria-label="Search..."
        aria-describedby="basic-addon-search31"
      />
    </div>

    <div className="form-password-toggle">
      <label className="form-label" for="basic-default-password32">
        Password
      </label>
      <div className="input-group input-group-merge">
        <input
          type="password"
          className="form-control"
          id="basic-default-password32"
          placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
          aria-describedby="basic-default-password2"
        />
        <span
          id="basic-default-password2"
          className="input-group-text cursor-pointer"
        >
          <i className="bx bx-hide"></i>
        </span>
      </div>
    </div>

    <div className="input-group input-group-merge">
      <input
        type="text"
        className="form-control"
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="basic-addon33"
      />
      <span className="input-group-text" id="basic-addon33">
        @example.com
      </span>
    </div>

    <div className="input-group input-group-merge">
      <span className="input-group-text" id="basic-addon34">
        https://example.com/users/
      </span>
      <input
        type="text"
        className="form-control"
        id="basic-url3"
        aria-describedby="basic-addon34"
      />
    </div>

    <div className="input-group input-group-merge">
      <span className="input-group-text">$</span>
      <input
        type="text"
        className="form-control"
        placeholder="100"
        aria-label="Amount (to the nearest dollar)"
      />
      <span className="input-group-text">.00</span>
    </div>

    <div className="input-group input-group-merge">
      <span className="input-group-text">With textarea</span>
      <textarea className="form-control" aria-label="With textarea"></textarea>
    </div>
  </div>
</div>;

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
</div>;
