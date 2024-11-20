export const ABI = [
  {
    type: "impl",
    name: "LandRegistry",
    interface_name: "land_registry::interface::land_register::ILandRegistry",
  },
  {
    type: "struct",
    name: "land_registry::interface::land_register::Location",
    members: [
      {
        name: "latitude",
        type: "core::felt252",
      },
      {
        name: "longitude",
        type: "core::felt252",
      },
    ],
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "enum",
    name: "land_registry::interface::land_register::LandUse",
    variants: [
      {
        name: "Residential",
        type: "()",
      },
      {
        name: "Commercial",
        type: "()",
      },
      {
        name: "Industrial",
        type: "()",
      },
      {
        name: "Agricultural",
        type: "()",
      },
      {
        name: "Recreational",
        type: "()",
      },
      {
        name: "Institutional",
        type: "()",
      },
      {
        name: "MixedUse",
        type: "()",
      },
      {
        name: "Unclassified",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "land_registry::interface::land_register::LandStatus",
    variants: [
      {
        name: "Pending",
        type: "()",
      },
      {
        name: "Approved",
        type: "()",
      },
      {
        name: "Rejected",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "land_registry::interface::land_register::Land",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "location",
        type: "land_registry::interface::land_register::Location",
      },
      {
        name: "area",
        type: "core::integer::u256",
      },
      {
        name: "land_use",
        type: "land_registry::interface::land_register::LandUse",
      },
      {
        name: "status",
        type: "land_registry::interface::land_register::LandStatus",
      },
      {
        name: "last_transaction_timestamp",
        type: "core::integer::u64",
      },
      {
        name: "inspector",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "fee",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "struct",
    name: "core::array::Span::<core::integer::u256>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::integer::u256>",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "land_registry::interface::land_register::ListingStatus",
    variants: [
      {
        name: "Active",
        type: "()",
      },
      {
        name: "Sold",
        type: "()",
      },
      {
        name: "Cancelled",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "land_registry::interface::land_register::Listing",
    members: [
      {
        name: "land_id",
        type: "core::integer::u256",
      },
      {
        name: "seller",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "price",
        type: "core::integer::u256",
      },
      {
        name: "status",
        type: "land_registry::interface::land_register::ListingStatus",
      },
      {
        name: "created_at",
        type: "core::integer::u64",
      },
      {
        name: "updated_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    type: "interface",
    name: "land_registry::interface::land_register::ILandRegistry",
    items: [
      {
        type: "function",
        name: "upgrade",
        inputs: [
          {
            name: "new_class_hash",
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "register_land",
        inputs: [
          {
            name: "location",
            type: "land_registry::interface::land_register::Location",
          },
          {
            name: "area",
            type: "core::integer::u256",
          },
          {
            name: "land_use",
            type: "land_registry::interface::land_register::LandUse",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "transfer_land",
        inputs: [
          {
            name: "land_id",
            type: "core::integer::u256",
          },
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_land",
        inputs: [
          {
            name: "land_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "land_registry::interface::land_register::Land",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_land_count",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_lands_by_owner",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::array::Span::<core::integer::u256>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "update_land",
        inputs: [
          {
            name: "land_id",
            type: "core::integer::u256",
          },
          {
            name: "area",
            type: "core::integer::u256",
          },
          {
            name: "land_use",
            type: "land_registry::interface::land_register::LandUse",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "approve_land",
        inputs: [
          {
            name: "land_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "reject_land",
        inputs: [
          {
            name: "land_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "is_inspector",
        inputs: [
          {
            name: "inspector",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "is_land_approved",
        inputs: [
          {
            name: "land_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_pending_approvals",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<core::integer::u256>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_land_transaction_history",
        inputs: [
          {
            name: "land_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<(core::starknet::contract_address::ContractAddress, core::integer::u64)>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_land_status",
        inputs: [
          {
            name: "land_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "land_registry::interface::land_register::LandStatus",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "set_land_inspector",
        inputs: [
          {
            name: "land_id",
            type: "core::integer::u256",
          },
          {
            name: "inspector",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_land_inspector",
        inputs: [
          {
            name: "land_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "add_inspector",
        inputs: [
          {
            name: "inspector",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "remove_inspector",
        inputs: [
          {
            name: "inspector",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "set_fee",
        inputs: [
          {
            name: "fee",
            type: "core::integer::u128",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_fee",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u128",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "create_listing",
        inputs: [
          {
            name: "land_id",
            type: "core::integer::u256",
          },
          {
            name: "price",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "cancel_listing",
        inputs: [
          {
            name: "listing_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "update_listing_price",
        inputs: [
          {
            name: "listing_id",
            type: "core::integer::u256",
          },
          {
            name: "new_price",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "buy_land",
        inputs: [
          {
            name: "listing_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_listing",
        inputs: [
          {
            name: "listing_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "land_registry::interface::land_register::Listing",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_active_listings",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<core::integer::u256>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_listing_price_history",
        inputs: [
          {
            name: "listing_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<(core::integer::u256, core::integer::u64)>",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "impl",
    name: "OwnableMixinImpl",
    interface_name: "openzeppelin_access::ownable::interface::OwnableABI",
  },
  {
    type: "interface",
    name: "openzeppelin_access::ownable::interface::OwnableABI",
    items: [
      {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "transfer_ownership",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "renounce_ownership",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "transferOwnership",
        inputs: [
          {
            name: "newOwner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "renounceOwnership",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "nft_contract_class_hash",
        type: "core::starknet::class_hash::ClassHash",
      },
      {
        name: "initial_fee_rate",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "OwnershipTransferred",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
        kind: "nested",
      },
      {
        name: "OwnershipTransferStarted",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
    kind: "struct",
    members: [
      {
        name: "class_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "Upgraded",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
        kind: "nested",
      },
    ],
  },
  {
    type: "enum",
    name: "core::option::Option::<core::felt252>",
    variants: [
      {
        name: "Some",
        type: "core::felt252",
      },
      {
        name: "None",
        type: "()",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::interface::land_register::LandRegistered",
    kind: "struct",
    members: [
      {
        name: "land_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "location",
        type: "land_registry::interface::land_register::Location",
        kind: "data",
      },
      {
        name: "area",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "land_use",
        type: "core::option::Option::<core::felt252>",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::interface::land_register::LandTransferred",
    kind: "struct",
    members: [
      {
        name: "land_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "from_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "to_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::interface::land_register::LandVerified",
    kind: "struct",
    members: [
      {
        name: "land_id",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::interface::land_register::LandUpdated",
    kind: "struct",
    members: [
      {
        name: "land_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "land_use",
        type: "core::option::Option::<core::felt252>",
        kind: "data",
      },
      {
        name: "area",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::interface::land_register::LandInspectorSet",
    kind: "struct",
    members: [
      {
        name: "land_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "inspector",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::interface::land_register::InspectorAdded",
    kind: "struct",
    members: [
      {
        name: "inspector",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::interface::land_register::InspectorRemoved",
    kind: "struct",
    members: [
      {
        name: "inspector",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::interface::land_register::FeeUpdated",
    kind: "struct",
    members: [
      {
        name: "old_fee",
        type: "core::integer::u128",
        kind: "data",
      },
      {
        name: "new_fee",
        type: "core::integer::u128",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::interface::land_register::ListingCreated",
    kind: "struct",
    members: [
      {
        name: "listing_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "land_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "seller",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "price",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::interface::land_register::ListingCancelled",
    kind: "struct",
    members: [
      {
        name: "listing_id",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::interface::land_register::ListingPriceUpdated",
    kind: "struct",
    members: [
      {
        name: "listing_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "old_price",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "new_price",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::interface::land_register::LandSold",
    kind: "struct",
    members: [
      {
        name: "listing_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "land_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "seller",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "buyer",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "price",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "land_registry::land_register::LandRegistryContract::Event",
    kind: "enum",
    variants: [
      {
        name: "OwnableEvent",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
        kind: "flat",
      },
      {
        name: "UpgradeableEvent",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
        kind: "flat",
      },
      {
        name: "LandRegistered",
        type: "land_registry::interface::land_register::LandRegistered",
        kind: "nested",
      },
      {
        name: "LandTransferred",
        type: "land_registry::interface::land_register::LandTransferred",
        kind: "nested",
      },
      {
        name: "LandVerified",
        type: "land_registry::interface::land_register::LandVerified",
        kind: "nested",
      },
      {
        name: "LandUpdated",
        type: "land_registry::interface::land_register::LandUpdated",
        kind: "nested",
      },
      {
        name: "LandInspectorSet",
        type: "land_registry::interface::land_register::LandInspectorSet",
        kind: "nested",
      },
      {
        name: "InspectorAdded",
        type: "land_registry::interface::land_register::InspectorAdded",
        kind: "nested",
      },
      {
        name: "InspectorRemoved",
        type: "land_registry::interface::land_register::InspectorRemoved",
        kind: "nested",
      },
      {
        name: "FeeUpdated",
        type: "land_registry::interface::land_register::FeeUpdated",
        kind: "nested",
      },
      {
        name: "ListingCreated",
        type: "land_registry::interface::land_register::ListingCreated",
        kind: "nested",
      },
      {
        name: "ListingCancelled",
        type: "land_registry::interface::land_register::ListingCancelled",
        kind: "nested",
      },
      {
        name: "ListingPriceUpdated",
        type: "land_registry::interface::land_register::ListingPriceUpdated",
        kind: "nested",
      },
      {
        name: "LandSold",
        type: "land_registry::interface::land_register::LandSold",
        kind: "nested",
      },
    ],
  },
];
