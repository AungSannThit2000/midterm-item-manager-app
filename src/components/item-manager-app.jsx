import "./item-manager-app.css"

import { useState, useRef } from "react";

import deleteLogo from '../assets/delete.svg';
import stationaryLogo from '../assets/ink_pen.svg';
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";


function ItemManager () {

  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */

  const [items, setItems] = useState([]);
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: ""
  });

  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input


  //TODO: Your code goes here
 

  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  const itemName = useRef(null);
  const nextId = useRef(1);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddItem = () => {
   if (!formData.name || !formData.category || !formData.price) {
    setErrorMsg("All fields are required.");
    return;
  }

  const newItem = {
    ...formData,
    id: nextId.current
  };

  nextId.current += 1; 

    setItems(prev => [...prev, newItem]);
    setFormData({ id: 1, name: "", category: "", price: "" });
    setErrorMsg("");
    itemName.current.focus();
  };
  const handleDelete = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const getCategoryIcon = (category) => {
    if (category === "Stationary") return stationaryLogo;
    if (category === "Kitchenware") return kitchenwareLogo;
    if (category === "Appliance") return applianceLogo;
    return null;
  };
  return (
    <>
      <div id="h1">
        Item Management
      </div>
      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {/*
              * TODO: Your code goes heref
              * !!! IMPORTANT !!!
              * - All items must be listed here (above the form row).
              * - Your input form must be implemented as the LAST row in this table.
              */
             items.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={getCategoryIcon(item.category)}
                    alt={item.category}
                  />
                </td>
                <td>{item.price}</td>
                <td>
                  <img
                    src={deleteLogo}
                    alt="delete"
                    onClick={() => handleDelete(index)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))
    
              }
          <tr>
              <td>
              </td>

              <td>
                <input
                  ref={itemName}
                  value={formData.name}
                  onChange={e => handleChange("name", e.target.value)}
                />
              </td>

              <td>
                <select
                  value={formData.category}
                  onChange={e => handleChange("category", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>

              <td>
                <input
                  type="number"
                  value={formData.price}
                  onChange={e => handleChange("price", e.target.value)}
                />
              </td>

              <td>
                <button  onClick={handleAddItem}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="error-message">
         <p color="red">{errorMsg}</p>
      </div>
    </>
  );
}

export default ItemManager