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
}
