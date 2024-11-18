/////////////////
//CUSTOM ERRORS
/////////////////
mod Errors {
    const MINT_NFT: felt252 = 'Only land registry can mint';
    const TRANSFER_NFT: felt252 = 'Only land registry can transfer';
    const UPDATE_BY_LAND: felt252 = 'Only owner can update land';
    const ONLY_OWNER_TRNF: felt252 = 'Only owner can transfer';
    const LAND_APPROVAL: felt252 = 'Land must be approved';
    const NO_LAND: felt252 = 'Land not found';
    const INSPECTOR_APPROVE: felt252 = 'Only inspector can approve';
    const INSPECTOR_REJECT: felt252 = 'Only inspector can reject';
    const PENDING_LAND: felt252 = 'Land must be in Pending status';
    const INSPECTOR_OWNER_APPR: felt252 = 'Only inspector/owner can reject';
    const OWNER_MK_INSPECTOR: felt252 = 'Only owner can set an inspector';
    const INSPECTOR_ADDR: felt252 = 'Invalid inspector address';
    const REGISTERED_INSPECTOR: felt252 = 'Inspector already registered';
    const NOT_REGISTERED_INSP: felt252 = 'Inspector not registered';
    const ACTIVE_INSPECTOR: felt252 = 'Inspector is active';
    const INSUFFICIENT_PAYMENT: felt252 = 'Insufficient registration fee';
    const NOT_AUTHORIZED: felt252 = 'Not authorized';
    const ADDRESS_ZERO: felt252 = 'ADDRESS_ZERO';
    const LAND_NOT_LISTED: felt252 = 'Land not listed';
    const INVALID_PRICE: felt252 = 'Invalid price';
    const ONLY_OWNER_LIST: felt252 = 'Only owner can list';
    const LAND_NOT_APPROVED: felt252 = 'Land not approved';
    const CANNOT_BUY_OWN_LAND: felt252 = 'Cannot buy own land';
    const AREA_NOT_ZERO: felt252 = 'Area must be greater than 0';
    const INVALID_ADDRESS: felt252 = 'Invalid address';
    const LOCKED: felt252 = 'Locked';
    const NOT_LOCKED: felt252 = 'Not locked';
    const SET_URI_ONLY_LAND_REGISTRY: felt252 = 'Only land registry can update';
    const LOCK_NFT_ONLY_LAND_REGISTRY: felt252 = 'Only land registry can lock';
    const UNLOCK_NFT_ONLY_LAND_REGISTRY: felt252 = 'Only land registry can unlock';

    // Listing only
    const ONLY_OWNER_CAN_LIST: felt252 = 'Only owner can list land';
    const ONLY_SELLER_CAN_CANCEL_LIST: felt252 = 'Only seller can cancel';
    const ONLY_SELLER_CAN_UPDATE_LIST: felt252 = 'Only seller can update';
    const SELLER_CANT_BUY_OWN: felt252 = 'Cannot buy own listing';
    const LISTING_NOT_ACTIVE: felt252 = 'Listing not active';
    const INSUFFICIENT_PAYMENT_TO_BUY_LAND: felt252 = 'Insufficient payment';
}
