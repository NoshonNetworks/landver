## land_registry Contract

The land_registry contract serves as the backbone of the land management system. It governs the ownership and administrative actions associated with land parcels, acting as the central authority for minting and transferring land NFTs. This contract enforces rules to ensure the integrity of the land ownership system while allowing seamless interaction with other smart contracts. By integrating advanced error handling and efficient functionality, it provides a secure and reliable framework for decentralized land management.

Here is a detailed explanation of each functionality in the `land_registry` module, along with its purpose, description, and parameters.

### **`register_land`**

- **Purpose**: Registers a new parcel of land.

| Parameter  | Type       | Description                                       |
| ---------- | ---------- | ------------------------------------------------- |
| `location` | `Location` | Geographic location of the land.                  |
| `area`     | `u64`      | Size of the land in square units.                 |
| `land_use` | `LandUse`  | The intended use of the land (e.g., residential). |

- **Description**:
  - Calculates the registration fee based on the area and ensures the caller has paid it.
  - Creates a unique `land_id` based on the caller's address, timestamp, and location.
  - Updates the storage with land information, links it to the owner's records, and logs the transaction history.
  - Emits a `LandRegistered` event.

---

### **`get_land`**

- **Purpose**: Retrieves the details of a specific land using its ID.

| Parameter | Type  | Description                        |
| --------- | ----- | ---------------------------------- |
| `land_id` | `u64` | The unique identifier of the land. |

- **Description**:
  - Returns the land record stored in the contract.

---

### **`get_land_count`**

- **Purpose**: Retrieves the total number of lands registered in the system.

| Parameter | Type | Description             |
| --------- | ---- | ----------------------- |
| None      | -    | No parameters required. |

- **Description**:
  - Returns the value of `land_count` from the contract storage.

---

### **`get_lands_by_owner`**

- **Purpose**: Retrieves all lands owned by a specific address.

| Parameter | Type              | Description               |
| --------- | ----------------- | ------------------------- |
| `owner`   | `ContractAddress` | The address of the owner. |

- **Description**:
  - Iterates through the lands mapped to the owner and returns them as an array.

---

### **`update_land`**

- **Purpose**: Updates the area and land use for a specified land parcel.

| Parameter  | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `land_id`  | `u64`     | The unique identifier of the land.    |
| `area`     | `u64`     | New size of the land in square units. |
| `land_use` | `LandUse` | Updated intended use of the land.     |

- **Description**:
  - Verifies that the caller is the owner of the land.
  - Updates the land record in the contract storage.
  - Emits a `LandUpdated` event.

---

### **`transfer_land`**

- **Purpose**: Transfers ownership of a specific land to another address.

| Parameter   | Type              | Description                        |
| ----------- | ----------------- | ---------------------------------- |
| `land_id`   | `u64`             | The unique identifier of the land. |
| `new_owner` | `ContractAddress` | Address of the new owner.          |

- **Description**:
  - Ensures the caller is the owner and the land is approved for transfer.
  - Updates ownership records for both the old and new owners.
  - Transfers the associated NFT and emits a `LandTransferred` event.

---

### **`approve_land`**

- **Purpose**: Approves a land parcel for transactions (e.g., transfers or listings).

| Parameter | Type  | Description                        |
| --------- | ----- | ---------------------------------- |
| `land_id` | `u64` | The unique identifier of the land. |

- **Description**:
  - Ensures the caller is an assigned inspector for the land.
  - Marks the land as approved, mints an associated NFT, and emits a `LandVerified` event.

---

### **`reject_land`**

- **Purpose**: Rejects a land application.

| Parameter | Type  | Description                        |
| --------- | ----- | ---------------------------------- |
| `land_id` | `u64` | The unique identifier of the land. |

- **Description**:
  - Ensures the caller is either an inspector or the owner.
  - Updates the land status to "Rejected" and emits a `LandVerified` event.

---

### **`is_inspector`**

- **Purpose**: Checks if a specific address is assigned as a land inspector.

| Parameter   | Type              | Description               |
| ----------- | ----------------- | ------------------------- |
| `inspector` | `ContractAddress` | Address of the inspector. |

- **Description**:
  - Verifies the number of lands assigned to the given inspector.

---

### **`is_land_approved`**

- **Purpose**: Checks if a specific land is approved for transactions.

| Parameter | Type  | Description                        |
| --------- | ----- | ---------------------------------- |
| `land_id` | `u64` | The unique identifier of the land. |

- **Description**:
  - Returns the approval status of the land.

---

### **`get_pending_approvals`**

- **Purpose**: Retrieves a list of all lands owned by the caller that are pending approval.

| Parameter | Type | Description             |
| --------- | ---- | ----------------------- |
| None      | -    | No parameters required. |

- **Description**:
  - Filters the lands owned by the caller to return those that are not yet approved.

---

### **`get_land_transaction_history`**

- **Purpose**: Retrieves the transaction history for a specific land.

| Parameter | Type  | Description                        |
| --------- | ----- | ---------------------------------- |
| `land_id` | `u64` | The unique identifier of the land. |

- **Description**:
  - Returns an array of transactions (address and timestamp) for the specified land.

---

### **`get_land_status`**

- **Purpose**: Retrieves the current status of a specific land.

| Parameter | Type  | Description                        |
| --------- | ----- | ---------------------------------- |
| `land_id` | `u64` | The unique identifier of the land. |

- **Description**:
  - Returns the status of the land (e.g., Pending, Approved, or Rejected).

---

### **`set_land_inspector`**

- **Purpose**: Assigns a land inspector to a specific land parcel.

| Parameter   | Type              | Description                        |
| ----------- | ----------------- | ---------------------------------- |
| `land_id`   | `u64`             | The unique identifier of the land. |
| `inspector` | `ContractAddress` | Address of the inspector.          |

- **Description**:
  - Verifies that the caller is authorized to assign inspectors and updates the storage with the assignment.

---

This structure now includes the parameters in a table format under each function’s description. Let me know if you need more details or adjustments!
