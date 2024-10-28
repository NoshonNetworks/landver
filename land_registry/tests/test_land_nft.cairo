use starknet::{ContractAddress, contract_address_const};
use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait, spy_events,
    start_cheat_caller_address, stop_cheat_caller_address
};
use land_registry::land_nft::{LandNFT, ILandNFTDispatcher, ILandNFTDispatcherTrait};

pub mod Accounts {
    use starknet::{ContractAddress, contract_address_const};

    pub fn land_registry() -> ContractAddress {
        contract_address_const::<'land_registry'>()
    }
}

fn deploy(metadata_uri: ByteArray) -> ILandNFTDispatcher {
    let mut constructor_args: Array<felt252> = array![];
    (Accounts::land_registry(), metadata_uri).serialize(ref constructor_args);

    let contract = declare("LandNFT").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@constructor_args).unwrap();

    ILandNFTDispatcher { contract_address }
}

#[test]
fn test_metadata_uri() {
    let metadata_uri = "https://some.metadata.uri/nft_id";
    let dispatcher = deploy(metadata_uri.clone());

    assert_eq!(metadata_uri, dispatcher.metadata_uri());
}

#[test]
fn test_update_metadata_uri() {
    let original_metadata_uri = "https://original.metadata.uri/nft_id";
    let dispatcher = deploy(original_metadata_uri.clone());
    let mut spy = spy_events();
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());

    let new_metadata_uri = "https://new.metadata.uri/nft_id";
    dispatcher.update_metadata_uri(new_metadata_uri.clone());

    assert_eq!(new_metadata_uri, dispatcher.metadata_uri());

    spy
        .assert_emitted(
            @array![
                (
                    dispatcher.contract_address,
                    LandNFT::Event::MetadataURIUpdated(
                        LandNFT::MetadataURIUpdated { new_metadata_uri }
                    )
                )
            ]
        );
}

#[test]
#[should_panic(expected: ('Only land registry can update',))]
fn test_update_metadata_uri_from_non_land_registry() {
    let original_metadata_uri = "https://original.metadata.uri/nft_id";
    let dispatcher = deploy(original_metadata_uri);

    let new_metadata_uri = "https://new.metadata.uri/nft_id";
    dispatcher.update_metadata_uri(new_metadata_uri);
}


#[test]
fn test_lock() {
    let metadata_uri = "https://some.metadata.uri/nft_id";
    let dispatcher = deploy(metadata_uri);
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
    let metadata_uri = "https://some.metadata.uri/nft_id";
    let dispatcher = deploy(metadata_uri);

    dispatcher.lock();
}

#[test]
#[should_panic(expected: ('Locked',))]
fn test_lock_when_already_locked() {
    let metadata_uri = "https://some.metadata.uri/nft_id";
    let dispatcher = deploy(metadata_uri);
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());

    dispatcher.lock();
    dispatcher.lock();
}

#[test]
#[should_panic(expected: ('Only land registry can unlock',))]
fn test_unlock_from_non_land_registry() {
    let metadata_uri = "https://some.metadata.uri/nft_id";
    let dispatcher = deploy(metadata_uri);
    // ensure state was 'locked'
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());
    dispatcher.lock();
    stop_cheat_caller_address(dispatcher.contract_address);

    dispatcher.unlock();
}

#[test]
#[should_panic(expected: ('Not locked',))]
fn test_unlock_when_already_unlocked() {
    let metadata_uri = "https://some.metadata.uri/nft_id";
    let dispatcher = deploy(metadata_uri);
    start_cheat_caller_address(dispatcher.contract_address, Accounts::land_registry());

    dispatcher.unlock();
}

