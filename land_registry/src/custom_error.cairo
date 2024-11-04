/////////////////
//CUSTOM ERRORS
/////////////////
mod Errors {
    const MINT_NFT: felt252 = 'Only land registry can mint';
    const TRANSFER_NFT: felt252 = 'Only land registry can transfer';
    const UPDATE_BY_OWNER: felt252 = 'Only owner can update land';
    const ONLY_OWNER_TRNF: felt252 = 'Only owner can transfer';
    const LAND_APPROVAL: felt252 = 'Land must be approved';
    const NO_LAND: felt252 = 'Land not found';
    const INSPECTOR_APPROVE: felt252 = 'Only inspector can approve';
    const INSPECTOR_REJECT: felt252 = 'Only inspector can reject';
}
