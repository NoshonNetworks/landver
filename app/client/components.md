# Component Library Documentation

This PR provides a set of reusable components designed for common UI tasks. Below are the details for each component and how to use them effectively.

---

## Components Overview

### 1. **`P` Component**
The `P` component is used for headings and paragraphs.  

#### Props:
- **`size`**: Controls the size of the text.
- **`weight`**: Sets the font weight.
- **`classname`**: Allows custom styles to be added.
- **`align`**: Aligns the text (e.g., left, center, right).

Refer to the component code for the expected values for these props.

---

### 2. **`Input TextField` Component**
This component is a customizable input field with extended functionality.  

#### Props:
- **HTML Input Attributes**: All standard input attributes (e.g., `type`, `placeholder`, etc.).
- **`error`**: *(Optional)* A string displayed below the field to indicate validation errors.
- **`onChange`**: A callback function to handle and receive the input field's value.
- **`classname`**: Allows custom styles to be added.

---

### 3. **`Input SelectField` Component**
This component is used for rendering dropdowns.  

#### Props:
- **HTML Select Attributes**: Standard select element attributes.
- **`options`**: An array of objects defining the dropdown's content.
- **`nameKey`**: Specifies the object property to display in the dropdown.
- **`value`**: Sets the default selected value.
- **`onChange`**: A callback function to handle the selected value in the parent component.
- **`classname`**: Allows custom styles to be added.

---

### 4. **`Modal` Component**
A flexible modal for displaying content overlays.  

#### Props:
- **`isOpen`**: A boolean controlling whether the modal is visible.
- **`onClose`**: A callback function to handle modal closure.
- **`size`**: Specifies the modal size. Options include:
  - `sm` (small)
  - `md` (medium)
  - `lg` (large)

---

### 5. **`Button` Component**
A versatile button component with customizable styles.  

#### Props:
- **HTML Button Attributes**: All standard button attributes.
- **`variant`**: Controls the button's color.
- **`size`**: Adjusts the button's size.
- **`type`**: Specifies the button type (e.g., `submit`, `button`).
- **`outlined`**: A boolean determining whether the button has an outlined style.
- **`onClick`**: A callback function triggered when the button is clicked.
- **`classname`**: Allows custom styles to be added.

---

### 6. **`Table` Component**
This component renders a data table with filtering and searching capabilities.  

#### Props:
- **`columns`**: Defines the table's column structure. See [`./src/app/components/Table/DefaultColumn.tsx`](./src/app/components/Table/DefaultColumn.tsx) for an example.
- **`data`**: The dataset to display. Each row's properties must match the column configuration.
- **`filterData`**: An array of strings for filtering table data.
- **`searchBy`**: A string specifying the column to filter the table using the search field.
- **`filterColumn`**: Specifies the column used for filtering with `filterData`.

---

### 7. **`PlacesAutocomplete` Component**
A location search input field powered by the Google Places API.  

#### Props:
- **`label`**: The label for the input field.
- **`onLocationSelect`**: A callback function returning the selected location's:
  - Latitude
  - Longitude
  - Address

---

## Usage Examples

Refer to the individual component files for usage examples and implementation details. These components are designed to be flexible, reusable, and easy to integrate into your projects.