import type { Abi } from "starknet";

export const ABI = [
    {
      "name": "LandRegistry",
      "type": "impl",
      "interface_name": "land_registry::interface::land_register::ILandRegistry"
    },
    {
      "name": "land_registry::interface::land_register::Location",
      "type": "struct",
      "members": [
        {
          "name": "latitude",
          "type": "core::felt252"
        },
        {
          "name": "longitude",
          "type": "core::felt252"
        }
      ]
    },
    {
      "name": "core::integer::u256",
      "type": "struct",
      "members": [
        {
          "name": "low",
          "type": "core::integer::u128"
        },
        {
          "name": "high",
          "type": "core::integer::u128"
        }
      ]
    },
    {
      "name": "land_registry::interface::land_register::LandUse",
      "type": "enum",
      "variants": [
        {
          "name": "Residential",
          "type": "()"
        },
        {
          "name": "Commercial",
          "type": "()"
        },
        {
          "name": "Industrial",
          "type": "()"
        },
        {
          "name": "Agricultural",
          "type": "()"
        },
        {
          "name": "Recreational",
          "type": "()"
        },
        {
          "name": "Institutional",
          "type": "()"
        },
        {
          "name": "MixedUse",
          "type": "()"
        },
        {
          "name": "Unclassified",
          "type": "()"
        }
      ]
    },
    {
      "name": "land_registry::interface::land_register::LandStatus",
      "type": "enum",
      "variants": [
        {
          "name": "Pending",
          "type": "()"
        },
        {
          "name": "Approved",
          "type": "()"
        },
        {
          "name": "Rejected",
          "type": "()"
        }
      ]
    },
    {
      "name": "land_registry::interface::land_register::Land",
      "type": "struct",
      "members": [
        {
          "name": "owner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "location",
          "type": "land_registry::interface::land_register::Location"
        },
        {
          "name": "area",
          "type": "core::integer::u256"
        },
        {
          "name": "land_use",
          "type": "land_registry::interface::land_register::LandUse"
        },
        {
          "name": "status",
          "type": "land_registry::interface::land_register::LandStatus"
        },
        {
          "name": "last_transaction_timestamp",
          "type": "core::integer::u64"
        },
        {
          "name": "inspector",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "fee",
          "type": "core::integer::u128"
        }
      ]
    },
    {
      "name": "core::array::Span::<core::integer::u256>",
      "type": "struct",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<core::integer::u256>"
        }
      ]
    },
    {
      "name": "core::bool",
      "type": "enum",
      "variants": [
        {
          "name": "False",
          "type": "()"
        },
        {
          "name": "True",
          "type": "()"
        }
      ]
    },
    {
      "name": "land_registry::interface::land_register::ListingStatus",
      "type": "enum",
      "variants": [
        {
          "name": "Active",
          "type": "()"
        },
        {
          "name": "Sold",
          "type": "()"
        },
        {
          "name": "Cancelled",
          "type": "()"
        }
      ]
    },
    {
      "name": "land_registry::interface::land_register::Listing",
      "type": "struct",
      "members": [
        {
          "name": "land_id",
          "type": "core::integer::u256"
        },
        {
          "name": "seller",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "price",
          "type": "core::integer::u256"
        },
        {
          "name": "status",
          "type": "land_registry::interface::land_register::ListingStatus"
        },
        {
          "name": "created_at",
          "type": "core::integer::u64"
        },
        {
          "name": "updated_at",
          "type": "core::integer::u64"
        }
      ]
    },
    {
      "name": "land_registry::interface::land_register::ILandRegistry",
      "type": "interface",
      "items": [
        {
          "name": "upgrade",
          "type": "function",
          "inputs": [
            {
              "name": "new_class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "register_land",
          "type": "function",
          "inputs": [
            {
              "name": "location",
              "type": "land_registry::interface::land_register::Location"
            },
            {
              "name": "area",
              "type": "core::integer::u256"
            },
            {
              "name": "land_use",
              "type": "land_registry::interface::land_register::LandUse"
            }
          ],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "external"
        },
        {
          "name": "transfer_land",
          "type": "function",
          "inputs": [
            {
              "name": "land_id",
              "type": "core::integer::u256"
            },
            {
              "name": "new_owner",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "get_land",
          "type": "function",
          "inputs": [
            {
              "name": "land_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "land_registry::interface::land_register::Land"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_land_count",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_lands_by_owner",
          "type": "function",
          "inputs": [
            {
              "name": "owner",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::array::Span::<core::integer::u256>"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "update_land",
          "type": "function",
          "inputs": [
            {
              "name": "land_id",
              "type": "core::integer::u256"
            },
            {
              "name": "area",
              "type": "core::integer::u256"
            },
            {
              "name": "land_use",
              "type": "land_registry::interface::land_register::LandUse"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "approve_land",
          "type": "function",
          "inputs": [
            {
              "name": "land_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "reject_land",
          "type": "function",
          "inputs": [
            {
              "name": "land_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "is_inspector",
          "type": "function",
          "inputs": [
            {
              "name": "inspector",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "is_land_approved",
          "type": "function",
          "inputs": [
            {
              "name": "land_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_pending_approvals",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::array::Array::<core::integer::u256>"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_land_transaction_history",
          "type": "function",
          "inputs": [
            {
              "name": "land_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::array::Array::<(core::starknet::contract_address::ContractAddress, core::integer::u64)>"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_land_status",
          "type": "function",
          "inputs": [
            {
              "name": "land_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "land_registry::interface::land_register::LandStatus"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "set_land_inspector",
          "type": "function",
          "inputs": [
            {
              "name": "land_id",
              "type": "core::integer::u256"
            },
            {
              "name": "inspector",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "get_land_inspector",
          "type": "function",
          "inputs": [
            {
              "name": "land_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "add_inspector",
          "type": "function",
          "inputs": [
            {
              "name": "inspector",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "remove_inspector",
          "type": "function",
          "inputs": [
            {
              "name": "inspector",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "set_fee",
          "type": "function",
          "inputs": [
            {
              "name": "fee",
              "type": "core::integer::u128"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "get_fee",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u128"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "create_listing",
          "type": "function",
          "inputs": [
            {
              "name": "land_id",
              "type": "core::integer::u256"
            },
            {
              "name": "price",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "external"
        },
        {
          "name": "cancel_listing",
          "type": "function",
          "inputs": [
            {
              "name": "listing_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "update_listing_price",
          "type": "function",
          "inputs": [
            {
              "name": "listing_id",
              "type": "core::integer::u256"
            },
            {
              "name": "new_price",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "buy_land",
          "type": "function",
          "inputs": [
            {
              "name": "listing_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "get_listing",
          "type": "function",
          "inputs": [
            {
              "name": "listing_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "land_registry::interface::land_register::Listing"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_active_listings",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::array::Array::<core::integer::u256>"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_listing_price_history",
          "type": "function",
          "inputs": [
            {
              "name": "listing_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::array::Array::<(core::integer::u256, core::integer::u64)>"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "name": "OwnableMixinImpl",
      "type": "impl",
      "interface_name": "openzeppelin_access::ownable::interface::OwnableABI"
    },
    {
      "name": "openzeppelin_access::ownable::interface::OwnableABI",
      "type": "interface",
      "items": [
        {
          "name": "owner",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "transfer_ownership",
          "type": "function",
          "inputs": [
            {
              "name": "new_owner",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "renounce_ownership",
          "type": "function",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "transferOwnership",
          "type": "function",
          "inputs": [
            {
              "name": "newOwner",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "renounceOwnership",
          "type": "function",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "constructor",
      "type": "constructor",
      "inputs": [
        {
          "name": "nft_contract_class_hash",
          "type": "core::starknet::class_hash::ClassHash"
        },
        {
          "name": "initial_fee_rate",
          "type": "core::integer::u128"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
      "type": "event",
      "members": [
        {
          "kind": "key",
          "name": "previous_owner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "key",
          "name": "new_owner",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
      "type": "event",
      "members": [
        {
          "kind": "key",
          "name": "previous_owner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "key",
          "name": "new_owner",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
      "type": "event",
      "variants": [
        {
          "kind": "nested",
          "name": "OwnershipTransferred",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred"
        },
        {
          "kind": "nested",
          "name": "OwnershipTransferStarted",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
      "type": "event",
      "variants": [
        {
          "kind": "nested",
          "name": "Upgraded",
          "type": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded"
        }
      ]
    },
    {
      "name": "core::option::Option::<core::felt252>",
      "type": "enum",
      "variants": [
        {
          "name": "Some",
          "type": "core::felt252"
        },
        {
          "name": "None",
          "type": "()"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "land_registry::interface::land_register::LandRegistered",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "land_id",
          "type": "core::integer::u256"
        },
        {
          "kind": "data",
          "name": "owner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "location",
          "type": "land_registry::interface::land_register::Location"
        },
        {
          "kind": "data",
          "name": "area",
          "type": "core::integer::u256"
        },
        {
          "kind": "data",
          "name": "land_use",
          "type": "core::option::Option::<core::felt252>"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "land_registry::interface::land_register::LandTransferred",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "land_id",
          "type": "core::integer::u256"
        },
        {
          "kind": "data",
          "name": "from_owner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "to_owner",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "land_registry::interface::land_register::LandVerified",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "land_id",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "land_registry::interface::land_register::LandUpdated",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "land_id",
          "type": "core::integer::u256"
        },
        {
          "kind": "data",
          "name": "land_use",
          "type": "core::option::Option::<core::felt252>"
        },
        {
          "kind": "data",
          "name": "area",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "land_registry::interface::land_register::LandInspectorSet",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "land_id",
          "type": "core::integer::u256"
        },
        {
          "kind": "data",
          "name": "inspector",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "land_registry::interface::land_register::InspectorAdded",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "inspector",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "land_registry::interface::land_register::InspectorRemoved",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "inspector",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "land_registry::interface::land_register::FeeUpdated",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "old_fee",
          "type": "core::integer::u128"
        },
        {
          "kind": "data",
          "name": "new_fee",
          "type": "core::integer::u128"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "land_registry::interface::land_register::ListingCreated",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "listing_id",
          "type": "core::integer::u256"
        },
        {
          "kind": "data",
          "name": "land_id",
          "type": "core::integer::u256"
        },
        {
          "kind": "data",
          "name": "seller",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "price",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "land_registry::interface::land_register::ListingCancelled",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "listing_id",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "land_registry::interface::land_register::ListingPriceUpdated",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "listing_id",
          "type": "core::integer::u256"
        },
        {
          "kind": "data",
          "name": "old_price",
          "type": "core::integer::u256"
        },
        {
          "kind": "data",
          "name": "new_price",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "land_registry::interface::land_register::LandSold",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "listing_id",
          "type": "core::integer::u256"
        },
        {
          "kind": "data",
          "name": "land_id",
          "type": "core::integer::u256"
        },
        {
          "kind": "data",
          "name": "seller",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "buyer",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "price",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "land_registry::land_register::LandRegistryContract::Event",
      "type": "event",
      "variants": [
        {
          "kind": "flat",
          "name": "OwnableEvent",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::Event"
        },
        {
          "kind": "flat",
          "name": "UpgradeableEvent",
          "type": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event"
        },
        {
          "kind": "nested",
          "name": "LandRegistered",
          "type": "land_registry::interface::land_register::LandRegistered"
        },
        {
          "kind": "nested",
          "name": "LandTransferred",
          "type": "land_registry::interface::land_register::LandTransferred"
        },
        {
          "kind": "nested",
          "name": "LandVerified",
          "type": "land_registry::interface::land_register::LandVerified"
        },
        {
          "kind": "nested",
          "name": "LandUpdated",
          "type": "land_registry::interface::land_register::LandUpdated"
        },
        {
          "kind": "nested",
          "name": "LandInspectorSet",
          "type": "land_registry::interface::land_register::LandInspectorSet"
        },
        {
          "kind": "nested",
          "name": "InspectorAdded",
          "type": "land_registry::interface::land_register::InspectorAdded"
        },
        {
          "kind": "nested",
          "name": "InspectorRemoved",
          "type": "land_registry::interface::land_register::InspectorRemoved"
        },
        {
          "kind": "nested",
          "name": "FeeUpdated",
          "type": "land_registry::interface::land_register::FeeUpdated"
        },
        {
          "kind": "nested",
          "name": "ListingCreated",
          "type": "land_registry::interface::land_register::ListingCreated"
        },
        {
          "kind": "nested",
          "name": "ListingCancelled",
          "type": "land_registry::interface::land_register::ListingCancelled"
        },
        {
          "kind": "nested",
          "name": "ListingPriceUpdated",
          "type": "land_registry::interface::land_register::ListingPriceUpdated"
        },
        {
          "kind": "nested",
          "name": "LandSold",
          "type": "land_registry::interface::land_register::LandSold"
        }
      ]
    }
  ] as const satisfies Abi;