export interface WalletConnectorProps {
    onLoginSuccess?: () => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

export interface RegisterLandModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "create"|"edit";
    editData?: LandData
  }
  
// used on forms to edit/create a land
export interface LandData {
    landId?: string, 
    area: number|null,
    landUse: string,
    latitude: number|null,
    longitude: number|null
}

export interface Land {
  id?: string,
  owner: string,
  location: {
      latitude: number,
      longitude: number
  },
  area: number,
  land_use: {
    variant: LandUseEnum
  },
  status: {
    variant: StatusEnum,
  },
  last_transaction_timestamp: string,
  inspector: string,
  fee: number
}

export type LandUseEnum = LandUseCommerial|LandUseIndustrial|LandUseRecreational|LandUseResidential|LandUseAgricultural|LandUseInstitucional|LandUseUnclassified|LandUseMixedUse

export interface LandUseCommerial {
  Commercial: object
}
export interface LandUseIndustrial {
  Industrial: object
}
export interface LandUseRecreational {
  Recreational: object
}
export interface LandUseResidential {
  Residential: object
}
export interface LandUseAgricultural {
  Agricultural: object
}
export interface LandUseInstitucional {
  Institucional: object
}
export interface LandUseUnclassified {
  Unclassified: object
}
export interface LandUseMixedUse {
  MixedUse:object
} 

export type StatusEnum = StatusApproved|StatusUnapproved|StatusBought|StatusPending

export interface StatusApproved {
  Approved:object
}
export interface StatusUnapproved {
  Unapproved:object
}
export interface StatusBought {
  Bought:object
}
export interface StatusPending {
  Pending:object
}


export interface Listing {
  "land_id": string,
  "seller": string,
  "price": number,
  "status": unknown,
  "created_at": string, // timestamp in seconds
  "updated_at": string, //timestamp in seconds
}

export interface ButtonProps extends React.PropsWithChildren {
    classname?: string;
    variant?: "default" | "error" | "success" | "gray" | "white" | "whiteWithBorder";
    size?: "small" | "medium" | "large" | "full";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
    "aria-label"?: string;
  }


export interface SmallNumberCardProps {
    iconColor:'blue'|'yellow'|'orange'|'purple'|'green', 
    title:string, 
    subtitle:string
}

export interface DropdownMenuItems {
    label:string,
    action: () => void,
    variant?: 'base'|'danger',
  }
  
export interface DropdownMenuProps {
    position:"bottom-left"|"top-left"|'bottom-right'|"top-right"|"bottom",
    items: DropdownMenuItems[],
    show:boolean
  }

export interface HeaderItem {
    label:string,
    alignText?:'left'|'center'|'right',
    fixedWidth?: number
  } 
  
export interface TableHeaderProps {
    items:HeaderItem[]
  }
  

  export interface RowItem {
    value?:string|number,
    alignText?:'left'|'center'|'right',
    fixedWidth?: number, 
    customjsx?: ()=>React.ReactNode
  } 
  
  export interface TableRowProps {
    items:RowItem[], 
    headers: string[],
  }

export interface TagProps {
    variant: 'approved'|'unapproved'|'pending'|"rejected"|"bought"
  }

 export  interface UseBlockiesParams {
    address: string | undefined;
  }

  export interface UseLandverContractParams {
    name:"landRegister",
  }

  export interface DynamicObject {
    [key: string]: string; // Allows any string as a key
  }

  export interface Event<parsedEvent extends ParsedEventsEnum> {
    eventKey:string, // Name of event in contract, example: LandRegistered, LandUpdated, etc
    eventName:string, // Human friendly event name, example: Land Registered, Land Updated, etc
    rawEvent: { // Event before parsing, just like comes from Event fetching (some properties omitted due to not use)
      from_address: string,
    }, 
    parsedEvent: parsedEvent; // Event after parsing it usign starknet.js (some properties omitted due to not use)
  }

  export interface eventFilters {
    events: string[] // list with the names of the events to search for
  }

  export interface UseEventsParams {
    name:"landRegister",
    triggerRefetch:boolean,
    filters?: eventFilters
  }

  export type ParsedEventsEnum = LandSoldEvent|ListingCreatedEvent|LandRegisteredEvent|LandTransferredEvent|LandVerifiedEvent|LandUpdatedEvent|LandInspectorSetEvent|InspectorAddedEvent|InspectorRemovedEvent|FeeUpdatedEvent|ListingCancelledEvent|ListingCreatedEvent|LandSoldEvent
  
  export interface ListingCreatedEvent {
        listing_id: number,
        land_id: string|number,
        seller: string,
        price: number
  }
  
  export interface LandRegisteredEvent {
    land_id: number|string,
    owner: number,
    location: {
      latitude: number,
      longitude: number
    },
    area: number,
    land_use: LandUseEnum,
  }

  export interface LandTransferredEvent {
    land_id: number|string,
    owner: number,
    from_owner: string,
    to_owner: string,
  }

  export interface LandVerifiedEvent {
    land_id: number|string,
  }

  export interface LandUpdatedEvent {
    land_id: number|string,
    land_use: LandUseEnum,
    area: number,
  }

  export interface LandInspectorSetEvent {
    land_id: number|string,
    inspector:string,
  }
  
  export interface InspectorAddedEvent {
    inspector:string,
  }

  export interface InspectorRemovedEvent {
    inspector:string,
  }
  
  export interface FeeUpdatedEvent {
    old_fee: number,
    new_fee: number,
  }
  
  export interface ListingCancelledEvent {
    listing_id: number,
  }
  
  export interface ListingPriceUpdatedEvent {
    listing_id: number,
    old_fee: number,
    new_fee: number,
  }

  export interface LandSoldEvent {
    listing_id: number,
    land_id: number|string,
    seller: string,
    buyer: string, 
    price: number
  }
