import React, { useEffect, useState } from "react";
import useMenuStore from "../../Utils/menuStore";
import useColorStore from "../../Utils/store";
import { Select, MenuItem } from "@mui/material";
import axios from "axios";
import "./index.css";

const defaultUser = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  streetAddress: "",
  city: "",
  state: "",
  postalZip: "",
  country: "",
};

const Menu = ({ options }) => {
  // const [isModalOpen, setModalOpen] = useState(false);
  const { colors } = useColorStore();
  const [formErrors, setFormErrors] = useState({});
  const { totalPrice, updateTotalPrice, updateSelection, selectedOptions } =
    useMenuStore();

  //form data
  const [userForm, setUserForm] = useState(defaultUser);

  //to handle single select
  const handleSingleSelectChange = (group, option) => {
    // // Update the selected option for the single-select group

    if (option === "default") {
      updateSelection({
        ...selectedOptions,
        [group]: {
          option: null,
          price: 0,
        },
      });
      return;
    }
    updateSelection({
      ...selectedOptions,
      [group]: {
        option,
        price: options[group].filter((item) => item.name === option)[0].price,
      },
    });
  };

  useEffect(() => {
    let total = 0;
    //loop through selectedOptions and update selectedOptions
    Object.entries(selectedOptions).forEach((group) => {
      if (selectedOptions[group[0]] && selectedOptions[group[0]].length > 0) {
        selectedOptions[group[0]].map((option) => {
          total += options[group[0]].filter((item) => item.name === option)[0]
            .price;
        });
        return;
      }
      total += selectedOptions[group[0]]?.price || 0;
    });
    updateTotalPrice(total);
  }, [selectedOptions]);

  //to handle multi select
  const handleMultiSelectChange = (heading, option) => {
    if (selectedOptions[heading].includes(option)) {
      updateSelection({
        ...selectedOptions,
        [heading]: selectedOptions[heading].filter((item) => item !== option),
      });
      return;
    }
    updateSelection({
      ...selectedOptions,
      [heading]: [...selectedOptions[heading], option],
    });
  };

  const handleUserFormChange = (event) => {
    const { name, value } = event.target;
    let error = "";
    if (value.trim() === "") {
      error = "This field is required";
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setUserForm((prevUserForm) => ({
      ...prevUserForm,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const templateParams = {
      to_name: "Shobhit Titus",
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      phone: userForm.phone,
      email: userForm.email,
      address: userForm.address,
      streetAddress: userForm.streetAddress,
      city: userForm.city,
      state: userForm.state,
      postalZip: userForm.postalZip,
      country: userForm.country,
      hullName: selectedOptions["Select your Hull (single select)"]?.option,
      hullPrice: selectedOptions["Select your Hull (single select)"]?.price,
      engineName: selectedOptions["Engine options (single select)"]?.option,
      enginePrice: selectedOptions["Engine options (single select)"]?.price,
      trailerName: selectedOptions["Trailer options (single select)"]?.option,
      trailerPrice: selectedOptions["Trailer options (single select)"]?.price,
      hullColor: colors["Hull Color"],
      powerPoles: colors["Power Poles"],
      polingPlatform: colors["Poling Platform"],
      accessories: selectedOptions["Accessories (multi-select)"]
        .map((item, index) => `(${index + 1}) ${item}`)
        .join("     "),
      additionalOptions: selectedOptions["Additional options (multi-select)"]
        .map((item, index) => `(${index + 1}) ${item}`)
        .join("     "),
      grabBarOptions: selectedOptions["Grab bar options (multi-select)"]
        .map((item, index) => `(${index + 1}) ${item}`)
        .join("     "),
      polingPlatformOptions: selectedOptions[
        "Poling platform options (multi-select)"
      ]
        .map((item, index) => `(${index + 1}) ${item}`)
        .join("     "),
      steeringKits: selectedOptions["Steering kits (multi-select)"]
        .map((item, index) => `(${index + 1}) ${item}`)
        .join("     "),
      trimOptions: selectedOptions["Trim options (multi-select)"]
        .map((item, index) => `(${index + 1}) ${item}`)
        .join("     "),

      message_html: JSON.stringify({
        colors: colors,
      }),
    };
    console.log(selectedOptions);
    console.log(colors);

    const requiredColors = ["Hull Color", "Power Poles", "Poling Platform"];
    const requiredUserFields = [
      "firstName",
      "lastName",
      "phone",
      "email",
      "address",
    ];

    if (requiredColors.every((color) => colors[color])) {
      if (requiredUserFields.every((field) => userForm[field])) {
        try {
          await emailjs.send(
            "service_lix0k54",
            "template_mdo5amt",
            templateParams,
            "MX384zq_9Yg81JBDP"
          );

          alert("Form submitted successfully");
          setUserForm(defaultUser);
        } catch (error) {
          console.error("Error submitting form:", error);
          alert("Error submitting form. Please try again.");
        }
      } else {
        const missingFields = requiredUserFields.filter(
          (field) => !userForm[field]
        );
        alert(
          `Please provide the following user details: ${missingFields.join(
            ", "
          )}`
        );
      }
    } else {
      const missingColors = requiredColors.filter((color) => !colors[color]);
      alert(
        `Please provide the following color details: ${missingColors.join(
          ", "
        )}`
      );
    }

    console.log(selectedOptions);
    console.log(colors);
  };

  return (
    <div className='menu-container'>
      <div className='centered'>
        <div className='menu-header'>Total: ${totalPrice.toFixed(2)}</div>
        <div className='menu-header-feature'>Pick Options</div>
      </div>

      <div className='menu-items-container'>
        <div className='menu-items'>
          {Object.entries(options).map(([heading, items], index) => (
            <div className='menu-items-1' key={index}>
              <div className='menu-heading'>{heading.split("(")[0].trim()}</div>
              {heading.includes("(single select)") ? (
                <Select
                  value={selectedOptions[heading]?.option || "default"}
                  onChange={(e) =>
                    handleSingleSelectChange(heading, e.target.value)
                  }
                  sx={{ height: 40, width: "100%", mb: 2 }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        width: "200px", // Set the desired width for the pop-up menu
                      },
                    },
                  }}
                >
                  <MenuItem
                    value={"default"}
                    sx={{
                      fontSize: 14,
                    }}
                  >
                    <em>Select an option</em>
                  </MenuItem>
                  {items.map((item, idx) => (
                    <MenuItem
                      key={idx}
                      value={item.name}
                      sx={{
                        fontSize: 12,
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <>
                  {items.map((item, idx) => (
                    <div key={idx} className='menu-item'>
                      <input
                        id={item.name + item.price}
                        type='checkbox'
                        checked={selectedOptions[heading].includes(item.name)}
                        onChange={(e) =>
                          handleMultiSelectChange(heading, item.name)
                        }
                      />
                      <label htmlFor={item.name + item.price}>
                        {item.name}
                      </label>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>

        <hr />
        <div className='centered'>
          <div className='menu-header-info'>User Information</div>
        </div>
        <div className='user-form'>
          <div className='form-field'>
            <label htmlFor='firstName'>First Name*</label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={userForm.firstName}
              onChange={handleUserFormChange}
              required
              placeholder='First Name'
            />
            {formErrors.firstName && (
              <div className='error-message'>{formErrors.firstName}</div>
            )}
          </div>
          <div className='form-field'>
            <label htmlFor='lastName'>Last Name*</label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={userForm.lastName}
              onChange={handleUserFormChange}
              required
              placeholder='Last Name'
            />
            {formErrors.lastName && (
              <div className='error-message'>{formErrors.lastName}</div>
            )}
          </div>
          <div className='form-field'>
            <label htmlFor='phone'>Phone*</label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={userForm.phone}
              onChange={handleUserFormChange}
              required
              placeholder='Phone Number'
            />
            {formErrors.phone && (
              <div className='error-message'>{formErrors.phone}</div>
            )}
          </div>
          <div className='form-field'>
            <label htmlFor='email'>Email*</label>
            <input
              type='email'
              id='email'
              name='email'
              value={userForm.email}
              onChange={handleUserFormChange}
              required
              placeholder='Email'
            />
            {formErrors.email && (
              <div className='error-message'>{formErrors.email}</div>
            )}
          </div>
          <div className='form-field'>
            <label htmlFor='address'>Address*</label>
            <input
              type='text'
              id='address'
              name='address'
              value={userForm.address}
              onChange={handleUserFormChange}
              required
              placeholder='Address'
            />
            {formErrors.address && (
              <div className='error-message'>{formErrors.address}</div>
            )}
          </div>
          <div className='form-field'>
            <label htmlFor='streetAddress'>Street Address</label>
            <input
              type='text'
              id='streetAddress'
              name='streetAddress'
              value={userForm.streetAddress}
              onChange={handleUserFormChange}
              placeholder='Street Address'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              id='city'
              name='city'
              value={userForm.city}
              onChange={handleUserFormChange}
              placeholder='city'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='state'>State</label>
            <input
              type='text'
              id='state'
              name='state'
              value={userForm.state}
              onChange={handleUserFormChange}
              placeholder='State'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='postalZip'>Postal Zip</label>
            <input
              type='text'
              id='postalZip'
              name='postalZip'
              value={userForm.postalZip}
              onChange={handleUserFormChange}
              placeholder='Postal Zip'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='country'>Country</label>
            <select
              id='country'
              name='country'
              value={userForm.country}
              onChange={handleUserFormChange}
            >
              <option value=''>Select a country</option>
              <option value='USA'>USA</option>
              <option value='Canada'>Canada</option>
              <option value='Mexico'>Mexico</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          {/* {Object.entries(colorStore.colors).map(([part, hexColor]) => (
        <div key={part} className="color-selection">
          <span>{part}</span>
            <div style={{
              backgroundColor: hexColor,
              width: '20px',
              height: '20px',
              boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.1) inset',
            }} ></div>
        </div>
      ))} */}
        </div>
        <div className='centered'>
          <button className='submit-button' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
