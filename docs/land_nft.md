# land_nft Contract
The land_nft contract implements the core functionalities for representing land parcels as NFTs, adhering to the ERC721 standard. It manages the creation, transfer, and metadata of these unique tokens while integrating additional features like locking mechanisms to restrict certain operations. This contract ensures that each land NFT is uniquely identifiable and fully compliant with established token standards, offering flexibility for use cases such as property transactions and decentralized applications.
 Here is a detailed explanation of each functionality in the `LandNFT` module, along with its purpose, description, and parameters.


### **`constructor`**
- **Purpose**: Initializes the `LandNFT` contract with a land registry address and a base URI for metadata.
  
| Parameter         | Type             | Description                                            |
|-------------------|------------------|--------------------------------------------------------|
| `land_registry`   | `ContractAddress` | Address of the associated land registry contract.      |
| `base_uri`        | `ByteArray`       | Base URI for the NFT metadata.                        |

- **Description**: 
  - Sets up the ERC721 storage with the contract name ("Land NFT"), symbol ("LAND"), and the metadata base URI.
  - Stores the address of the land registry contract in the storage.

---

### **`mint`**
- **Purpose**: Mints a new NFT representing a land parcel.
  
| Parameter   | Type             | Description                                            |
|-------------|------------------|--------------------------------------------------------|
| `to`        | `ContractAddress` | Address to which the NFT will be minted.              |
| `token_id`  | `u256`            | Unique identifier for the NFT.                        |

- **Description**: 
  - Ensures that only the land registry contract can mint NFTs.
  - Creates a new NFT for the specified address with the given `token_id`.

---

### **`transfer`**
- **Purpose**: Transfers ownership of an NFT from one address to another.
  
| Parameter   | Type             | Description                                            |
|-------------|------------------|--------------------------------------------------------|
| `from`      | `ContractAddress` | Address of the current owner.                         |
| `to`        | `ContractAddress` | Address of the new owner.                             |
| `token_id`  | `u256`            | Unique identifier of the NFT to be transferred.       |

- **Description**: 
  - Verifies that only the land registry contract can initiate transfers.
  - Checks that the NFT is not locked before transferring.
  - Transfers the NFT ownership using the ERC721 standard.

---

### **`set_base_uri`**
- **Purpose**: Updates the base URI for metadata associated with the NFTs.
  
| Parameter       | Type             | Description                                            |
|-----------------|------------------|--------------------------------------------------------|
| `new_base_uri`  | `ByteArray`       | The new base URI for the metadata.                    |
| `updater`       | `ContractAddress` | Address of the entity updating the base URI.          |

- **Description**: 
  - Ensures only the land registry contract can update the URI.
  - Updates the ERC721 metadata base URI and emits a `BaseURIUpdated` event.

---

### **`lock`**
- **Purpose**: Locks a specific NFT to prevent it from being transferred.
  
| Parameter   | Type   | Description                                            |
|-------------|--------|--------------------------------------------------------|
| `token_id`  | `u256` | Unique identifier of the NFT to be locked.             |

- **Description**: 
  - Ensures only the land registry contract can lock NFTs.
  - Verifies that the NFT is not already locked.
  - Sets the `locked` status of the specified token to `true` and emits a `Locked` event.

---

### **`unlock`**
- **Purpose**: Unlocks a specific NFT to allow transfers.
  
| Parameter   | Type   | Description                                            |
|-------------|--------|--------------------------------------------------------|
| `token_id`  | `u256` | Unique identifier of the NFT to be unlocked.           |

- **Description**: 
  - Ensures only the land registry contract can unlock NFTs.
  - Verifies that the NFT is currently locked.
  - Sets the `locked` status of the specified token to `false` and emits an `Unlocked` event.

---

### **`is_locked`**
- **Purpose**: Checks whether a specific NFT is locked.
  
| Parameter   | Type   | Description                                            |
|-------------|--------|--------------------------------------------------------|
| `token_id`  | `u256` | Unique identifier of the NFT to check.                 |

- **Description**: 
  - Returns `true` if the specified token is locked; otherwise, returns `false`.

---

### **`_assert_not_locked` (Internal)**
- **Purpose**: Ensures a function is only callable when the NFT is not locked.
  
| Parameter   | Type   | Description                                            |
|-------------|--------|--------------------------------------------------------|
| `token_id`  | `u256` | Unique identifier of the NFT.                          |

- **Description**: 
  - Throws an error if the specified token is locked.

---

### **`_assert_locked` (Internal)**
- **Purpose**: Ensures a function is only callable when the NFT is locked.
  
| Parameter   | Type   | Description                                            |
|-------------|--------|--------------------------------------------------------|
| `token_id`  | `u256` | Unique identifier of the NFT.                          |

- **Description**: 
  - Throws an error if the specified token is not locked.

---

This breakdown provides a clear understanding of the functionalities in `land_nft.cairo` and their respective descriptions.