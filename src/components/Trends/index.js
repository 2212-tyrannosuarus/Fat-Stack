import React from "react";

const Trends = () => {
  return (
    <aside
      id="layout-menu"
      class="layout-menu menu-vertical menu bg-menu-theme"
      data-bg-class="bg-menu-theme"
    >
      <div class="menu-inner-shadow" style={{ display: "none" }}></div>

      <ul class="menu-inner py-1 ps ps--active-y">

        {/* <!-- Layouts --> */}
        <li class="menu-item">
          <a href="javascript:void(0);" class="menu-link menu-toggle">
            <i class="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Layouts">SPENDING GRAPHS</div>
          </a>

          <ul class="menu-sub">
            <li class="menu-item">
              <a href="layouts-without-menu.html" class="menu-link">
                <div data-i18n="Without menu">Overtime</div>
              </a>
            </li>
            <li class="menu-item">
              <a href="layouts-without-navbar.html" class="menu-link">
                <div data-i18n="Without navbar">By Category</div>
              </a>
            </li>
            <li class="menu-item">
              <a href="layouts-container.html" class="menu-link">
                <div data-i18n="Container">By Merchant</div>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Trends;
