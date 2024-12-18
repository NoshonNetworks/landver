/////////////////
//CUSTOM ERRORS
/////////////////
pub mod Errors {
    pub const MINT_NFT: felt252 = 'Only land registry can mint';
    pub const TRANSFER_NFT: felt252 = 'Only land registry can transfer';
    pub const UPDATE_BY_LAND: felt252 = 'Only owner can update land';
    pub const ONLY_OWNER_TRNF: felt252 = 'Only owner can transfer';
    pub const LAND_APPROVAL: felt252 = 'Land must be approved';

    pub const NO_LAND: felt252 = 'Land not found';
    pub const INSPECTOR_APPROVE: felt252 = 'Only inspector can approve';
    pub const INSPECTOR_REJECT: felt252 = 'Only inspector can reject';
    pub const PENDING_LAND: felt252 = 'Land must be in Pending status';
    pub const INSPECTOR_OWNER_APPR: felt252 = 'Only inspector/owner can reject';
    pub const OWNER_MK_INSPECTOR: felt252 = 'Only owner can set an inspector';
    pub const INSPECTOR_ADDR: felt252 = 'Invalid inspector address';
    pub const REGISTERED_INSPECTOR: felt252 = 'Inspector already registered';
    pub const NOT_REGISTERED_INSP: felt252 = 'Inspector not registered';
    pub const ACTIVE_INSPECTOR: felt252 = 'Inspector is active';
    pub const NOT_AUTHORIZED: felt252 = 'Not authorized';
    pub const ADDRESS_ZERO: felt252 = 'ADDRESS_ZERO';
    pub const LAND_NOT_LISTED: felt252 = 'Land not listed';
    pub const INVALID_PRICE: felt252 = 'Invalid price';
    pub const ONLY_OWNER_LIST: felt252 = 'Only owner can list';
    pub const LAND_NOT_APPROVED: felt252 = 'Land not approved';
    pub const CANNOT_BUY_OWN_LAND: felt252 = 'Cannot buy own land';
    pub const AREA_NOT_ZERO: felt252 = 'Area must be greater than 0';
    pub const INVALID_ADDRESS: felt252 = 'Invalid address';
    pub const LOCKED: felt252 = 'Locked';
    pub const NOT_LOCKED: felt252 = 'Not locked';
    pub const SET_URI_ONLY_LAND_REGISTRY: felt252 = 'Only land registry can update';
    pub const LOCK_NFT_ONLY_LAND_REGISTRY: felt252 = 'Only land registry can lock';
    pub const UNLOCK_NFT_ONLY_LAND_REGISTRY: felt252 = 'Only land registry can unlock';

    // Listing only
    pub const ONLY_OWNER_CAN_LIST: felt252 = 'Only owner can list land';
    pub const ONLY_SELLER_CAN_CANCEL_LIST: felt252 = 'Only seller can cancel';
    pub const ONLY_SELLER_CAN_UPDATE_LIST: felt252 = 'Only seller can update';
    pub const SELLER_CANT_BUY_OWN: felt252 = 'Cannot buy own listing';
    pub const LISTING_NOT_ACTIVE: felt252 = 'Listing not active';
    pub const INSUFFICIENT_PAYMENT_TO_BUY_LAND: felt252 = 'Insufficient payment';
}
