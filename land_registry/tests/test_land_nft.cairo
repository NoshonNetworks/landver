use starknet::{ContractAddress, contract_address_const};
use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait, spy_events,
    start_cheat_caller_address, stop_cheat_caller_address
};
use land_registry::land_nft::{LandNFT, ILandNFTDispatcher, ILandNFTDispatcherTrait};
use openzeppelin::token::erc721::interface::{
    IERC721MetadataDispatcher, IERC721MetadataDispatcherTrait
};

pub mod Accounts {
    use core::num::traits::Zero;
    use starknet::{ContractAddress, contract_address_const};

    pub fn land_registry() -> ContractAddress {
        contract_address_const::<'land_registry'>()
    }

    pub fn land_owner() -> ContractAddress {
        contract_address_const::<'land_owner'>()
    }

    pub fn zero() -> ContractAddress {
        Zero::zero()
    }
}

const TOKEN_ID: u256 = 1;

fn deploy(base_uri: ByteArray) -> ILandNFTDispatcher {
    let mut constructor_args: Array<felt252> = array![];
    (Accounts::land_registry(), base_uri).serialize(ref constructor_args);

    let contract = declare("LandNFT").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@constructor_args).unwrap();

    let dispatcher = ILandNFTDispatcher { contract_address };
    dispatcher.mint(Accounts::land_owner(), TOKEN_ID);

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
                        LandNFT::BaseURIUpdated { caller: Accounts::land_owner(), new_base_uri }
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
    assert!(!dispatcher.is_locked());

    dispatcher.lock();
    assert!(dispatcher.is_locked());

    spy
        .assert_emitted(
            @array![(dispatcher.contract_address, LandNFT::Event::Locked(LandNFT::Locked {}))]
        );

    dispatcher.unlock();
    assert!(!dispatcher.is_locked());

    spy
        .assert_emitted(
            @array![(dispatcher.contract_address, LandNFT::Event::Unlocked(LandNFT::Unlocked {}))]
        );
}

#[test]
#[should_panic(expected: ('Only land registry can lock',))]
fn test_lock_from_non_land_registry() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);

    dispatcher.lock();
}

#[test]
#[should_panic(expected: ('Locked',))]
fn test_lock_when_already_locked() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());

    dispatcher.lock();
    dispatcher.lock();
}

#[test]
#[should_panic(expected: ('Only land registry can unlock',))]
fn test_unlock_from_non_land_registry() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);
    // ensure state was 'locked'
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());
    dispatcher.lock();
    stop_cheat_caller_address(dispatcher.contract_address);

    dispatcher.unlock();
}

#[test]
#[should_panic(expected: ('Not locked',))]
fn test_unlock_when_already_unlocked() {
    let base_uri = "https://some.base.uri/";
    let dispatcher = deploy(base_uri);
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());

    dispatcher.unlock();
}

