use starknet::{ContractAddress, contract_address_const};
use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait, spy_events,
    start_cheat_caller_address, stop_cheat_caller_address
};
use land_registry::land_nft::{LandNFT};
use land_registry::interface::land_nft::{BaseURIUpdated, Locked, Unlocked};
use land_registry::interface::land_nft::{ILandNFTDispatcher, ILandNFTDispatcherTrait};
use openzeppelin::token::erc721::interface::{
    IERC721MetadataDispatcher, IERC721MetadataDispatcherTrait
};

pub mod Accounts {
    use core::num::traits::Zero;
    use starknet::{ContractAddress, contract_address_const};

    pub fn land_registry() -> ContractAddress {
        contract_address_const::<'0x123'>()
    }

    pub fn land_owner() -> ContractAddress {
        contract_address_const::<'0x456'>()
    }

    pub fn zero() -> ContractAddress {
        Zero::zero()
    }
}

const TOKEN_ID: u256 = 1;
const NON_EXISTENT_TOKEN_ID: u256 = 2;

fn deploy(base_uri: ByteArray) -> ILandNFTDispatcher {
    let mut constructor_args: Array<felt252> = array![];
    constructor_args.append(Accounts::land_registry().try_into().unwrap());
    base_uri.serialize(ref constructor_args);

    let contract = declare("LandNFT").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@constructor_args).unwrap();

    let dispatcher = ILandNFTDispatcher { contract_address };

    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());
    dispatcher.mint(Accounts::land_owner(), TOKEN_ID);
    stop_cheat_caller_address(dispatcher.contract_address);

    dispatcher
}

#[test]
fn test_base_uri() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri.clone());
    let dispatcher = IERC721MetadataDispatcher { contract_address: dispatcher.contract_address };

    assert_eq!(format!("{base_uri}{TOKEN_ID}"), dispatcher.token_uri(TOKEN_ID));
}

#[test]
fn test_set_base_uri() {
    let original_base_uri = "https://original.base.uri/";
    let dispatcher = deploy(original_base_uri.clone());
    let mut spy = spy_events();
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());

    let new_base_uri = "https://new.base.uri/";
    dispatcher.set_base_uri(new_base_uri.clone(), Accounts::land_owner());

    let dispatcher = IERC721MetadataDispatcher { contract_address: dispatcher.contract_address };
    assert_eq!(format!("{new_base_uri}{TOKEN_ID}"), dispatcher.token_uri(TOKEN_ID));

    spy
        .assert_emitted(
            @array![
                (
                    dispatcher.contract_address,
                    LandNFT::Event::BaseURIUpdated(
                        BaseURIUpdated { caller: Accounts::land_owner(), new_base_uri }
                    )
                )
            ]
        );
}

#[test]
#[should_panic(expected: ('Only land registry can update',))]
fn test_set_base_uri_from_non_land_registry() {
    let original_base_uri = "https://original.base.uri/";
    let dispatcher = deploy(original_base_uri);

    let new_base_uri = "https://new.base.uri/";
    dispatcher.set_base_uri(new_base_uri, Accounts::land_owner());
}

#[test]
#[should_panic(expected: ('Invalid address',))]
fn test_set_base_uri_updated_zero_address() {
    let original_base_uri = "https://original.base.uri/";
    let dispatcher = deploy(original_base_uri);
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());

    let new_base_uri = "https://new.base.uri/";
    dispatcher.set_base_uri(new_base_uri, Accounts::zero());
}

#[test]
fn test_lock() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);
    let mut spy = spy_events();
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());

    // verify default state is unlocked
    assert!(!dispatcher.is_locked(TOKEN_ID));

    dispatcher.lock(TOKEN_ID);
    assert!(dispatcher.is_locked(TOKEN_ID));

    spy
        .assert_emitted(
            @array![
                (dispatcher.contract_address, LandNFT::Event::Locked(Locked { token_id: TOKEN_ID }))
            ]
        );

    dispatcher.unlock(TOKEN_ID);
    assert!(!dispatcher.is_locked(TOKEN_ID));

    spy
        .assert_emitted(
            @array![
                (
                    dispatcher.contract_address,
                    LandNFT::Event::Unlocked(Unlocked { token_id: TOKEN_ID })
                )
            ]
        );
}

#[test]
#[should_panic(expected: ('Only land registry can lock',))]
fn test_lock_from_non_land_registry() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);

    dispatcher.lock(TOKEN_ID);
}

#[test]
#[should_panic(expected: ('Locked',))]
fn test_lock_when_already_locked() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());

    dispatcher.lock(TOKEN_ID);
    dispatcher.lock(TOKEN_ID);
}

#[test]
#[should_panic(expected: ('ERC721: invalid token ID',))]
fn test_lock_non_existing_token() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());

    dispatcher.lock(NON_EXISTENT_TOKEN_ID);
}

#[test]
#[should_panic(expected: ('Only land registry can unlock',))]
fn test_unlock_from_non_land_registry() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);
    // ensure state was 'locked'
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());
    dispatcher.lock(TOKEN_ID);
    stop_cheat_caller_address(dispatcher.contract_address);

    dispatcher.unlock(TOKEN_ID);
}

#[test]
#[should_panic(expected: ('Not locked',))]
fn test_unlock_when_already_unlocked() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());

    dispatcher.unlock(TOKEN_ID);
}

#[test]
#[should_panic(expected: ('ERC721: invalid token ID',))]
fn test_unlock_non_existing_token() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());

    dispatcher.unlock(NON_EXISTENT_TOKEN_ID);
}

#[test]
fn test_upgradability() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);
    let new_class_hash = declare("LandNFT").unwrap().contract_class().class_hash;
    dispatcher.upgrade(*new_class_hash);
}

#[test]
#[should_panic]
fn test_upgradability_should_fail_if_not_owner_tries_to_update() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);
    let new_class_hash = declare("LandNFT").unwrap().contract_class().class_hash;
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());
    dispatcher.upgrade(*new_class_hash);
}

